const { Client } = require('@xhayper/discord-rpc')
const { applicationId, activity, connection } = require('../config')
const { pluralise } = require('./utils/string')
const ConfigSchema = require('./schemas/ConfigSchema')
const logger = require('./utils/logger')

const MAX_RETRIES = connection.maxRetries
const RETRY_INTERVAL = connection.retryInterval * 1000

let client
let retryCount = 0

const updateActivity = (sanitisedActivity) => {
  client.user?.setActivity(sanitisedActivity)
  logger.success(`Successfully updated ${client.user?.username}'s Rich Presence.`)
}

const sanitiseActivity = () => {
  const buttons = []
  const buttonObj = Object.values(activity.buttons)
  buttonObj.forEach((button) => {
    if (button.label && button.url) {
      buttons.push(button)
    }
  })
  const sanitisedActivity = {
    details: activity.details,
    state: activity.state,
    partySize: activity.party.partySize,
    partyMax: activity.party.partyMax,
    startTimestamp: activity.timestamps.startTimestamp,
    endTimestamp: activity.timestamps.endTimestamp,
    largeImageKey: activity.assets.largeImageKey,
    largeImageText: activity.assets.largeImageText,
    smallImageKey: activity.assets.smallImageKey,
    smallImageText: activity.assets.smallImageText,
    buttons: buttons.length ? buttons : undefined,
    instance: false,
    type: activity.type,
  }
  logger.info(`Attempting to update ${client.user?.username}'s Rich Presence.`)
  updateActivity(sanitisedActivity)
}

const retryConnection = () => {
  if (client) {
    client.user?.clearActivity()
    client.destroy()
    client = null
    client = new Client({
      transport: { type: 'ipc' },
      clientId: applicationId,
    })
  }
  if (retryCount < MAX_RETRIES) {
    logger.info(
      `Attempting to establish a connection with Discord. Retrying in ${
        RETRY_INTERVAL / 1000
      } ${pluralise(RETRY_INTERVAL / 1000, 'second')} - ${MAX_RETRIES - retryCount} ${pluralise(
        MAX_RETRIES - retryCount,
        'attempt'
      )} remaining.`
    )
    setTimeout(() => establishConnection((retryCount += 1)), RETRY_INTERVAL)
  } else {
    logger.error(
      `Failed to establish a connection with Discord after ${MAX_RETRIES} ${pluralise(
        MAX_RETRIES - retryCount,
        'attempt'
      )}. Maximum retries reached - exiting the process.`
    )
    return (process.exitCode = 1)
  }
}

const establishConnection = () => {
  try {
    client.login()
    client.on('ready', () => {
      logger.success(
        `Successfully established a connection with Discord. Username: ${client.user?.username}.`
      )
      sanitiseActivity((retryCount = 0))
    })
    client.transport.once('close', () => {
      logger.warning('Connection with Discord closed.')
      retryConnection()
    })
  } catch (error) {
    retryConnection()
  }
}

const initialiseClient = () => {
  client = new Client({ transport: { type: 'ipc' }, clientId: applicationId })
  logger.info('Attempting to establish a connection with Discord.')
  establishConnection()
}

const validateConfig = () => {
  const validationResult = ConfigSchema.validate(
    {
      applicationId,
      activity,
      connection,
    },
    { abortEarly: false, stripUnknown: true }
  )
  if (validationResult.error) {
    logger.error('Failed to validate the "config.js" file.')
    validationResult.error.details.map(({ message }) => {
      logger.info(message)
    })
    return (process.exitCode = 1)
  } else {
    logger.success('Successfully validated the "config.js" file.')
    initialiseClient()
  }
}

process.on('unhandledRejection', (error) => {
  if (error.message === 'Could not connect') {
    if (retryCount < MAX_RETRIES) {
      logger.warning('Failed to establish a connection with Discord.')
    }
    retryConnection()
  }
})

validateConfig()

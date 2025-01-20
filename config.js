/**
 * IMPORTANT NOTE:
 * To disable, and hide any of the activity fields in your Rich Presence, set the value to undefined,
 * Please refer to the documentation: https://github.com/Jxyme/simple-discord-rpc#configuration
 * and/or reach out via Discord: emyaj
 */

module.exports = {
  applicationId: '',
  activity: {
    details: undefined,
    state: undefined,
    party: {
      partySize: undefined,
      partyMax: undefined,
    },
    timestamps: {
      startTimestamp: undefined,
      endTimestamp: undefined,
    },
    assets: {
      largeImageKey: undefined,
      largeImageText: undefined,
      smallImageKey: undefined,
      smallImageText: undefined,
    },
    buttons: {
      primary: {
        label: undefined,
        url: undefined,
      },
      secondary: {
        label: undefined,
        url: undefined,
      },
    },
    type: 0,
  },
  connection: {
    maxRetries: 7,
    retryInterval: 10,
  },
}

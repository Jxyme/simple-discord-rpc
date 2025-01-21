/**
 * IMPORTANT NOTE:
 * To disable, and hide any of the activity fields in your Rich Presence, set the value to: undefined,
 * Please refer to the documentation: https://github.com/Jxyme/simple-discord-rpc#configuration-file-1
 * and/or reach out via Discord with any questions: emyaj
 */

module.exports = {
  applicationId: '', // your developer application id
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
    type: 0, // Playing: 0, Listening to: 2, Watching: 3, or Competing in: 5
  },
  connection: {
    maxRetries: 7, // number of retries to establish a connection with Discord (default: 7)
    retryInterval: 10, // number of seconds to wait in-between retries (default: 10)
  },
}

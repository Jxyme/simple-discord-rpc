# simple-discord-rpc

Beautify your Discord profile with a fully customizable Discord Rich Presence, now with buttons.

### Table of Contents
**[Requirements](#requirements)**<br>
**[Usage Instructions](#usage-instructions)**<br>
**[Configuration](#configuration-breakdown)**<br>
**[Example](#discord-rich-presence-example)**

## Requirements
[NodeJS](https://nodejs.org/en/download/)

[Discord Developer Application](https://discord.com/developers/applications)

## Usage Instructions
1. Download and install [NodeJS](https://nodejs.org/en/download/).

2. Download the latest .ZIP from the [Releases](https://github.com/Jxyme/simple-discord-rpc/releases) section from this repo. (feel free to clone/fork for further tweaking/development)

3. Run `npm i` from inside of the directory to install all of the node_module required packages for the project.

4. Open the `config.json.example` file, modify the contents, and then save it as `config.json`. (see below for a few examples)

5. Run `node .` or `node index.js` to start the application. (ensuring you followed Step 4 beforehand)

## Configuration Breakdown

### `config.json.example`

```json
{
    "clientId": "YOUR_DISCORD_DEVELOPER_APPLICATION_CLIENT_ID_GOES_HERE",
    "rich_presence": {
        "details": "ANYTHING_ENTERED_HERE_WILL_DISPLAY_BELOW_THE_APPLICATION_NAME",
        "state": "ANYTHING_ENTERED_HERE_WILL_DISPLAY_BELOW_THE_TEXT_ABOVE",
        "assets": {
            "largeImageText": "TEXT_ENTERED_HERE_WILL_DISPLAY_ON_LARGE_IMAGE_HOVER",
            "largeImageKey": "ENTER_THE_LARGE_ART_ASSET_NAME_HERE",
            "smallImageText": "TEXT_ENTERED_HERE_WILL_DISPLAY_ON_SMALL_IMAGE_HOVER",
            "smallImageKey": "ENTER_THE_SMALL_ART_ASSET_NAME_HERE"
        },
        "buttons": {
            "primary": {
                "buttonLabelText": "Placeholder Text 1",
                "buttonRedirectUrl": "http://example.com/"
            },
            "secondary": {
                "buttonLabelText": "Placeholder Text 2",
                "buttonRedirectUrl": "https://example.com/"
            }
        },
        "timestamps": {
            "startTimestamp": "EPOCH_START_TIMESTAMP_THIS_IS_OPTIONAL",
            "endTimestamp": "EPOCH_END_TIMESTAMP_THIS_IS_OPTIONAL",
            "useTimer": "TRUE_OR_FALSE_WITHOUT_QUOTES"
        }
    }
}
```

## Discord Rich Presence Example

### `config.json`
```json
{
    "clientId": "REMOVED_FOR_OBVIOUS_REASONS",
    "rich_presence": {
        "details": "New Year's Eve Special",
        "state": "18:00 - 04:00 UTC",
        "assets": {
            "largeImageText": "Q-dance",
            "largeImageKey": "q-dance",
            "smallImageText": "🧡",
            "smallImageKey": "orange-heart"
        },
        "buttons": {
            "primary": {
                "buttonLabelText": "Live Stream",
                "buttonRedirectUrl": "https://live.q-dance.com/"
            },
            "secondary": {
                "buttonLabelText": "Fork me on GitHub",
                "buttonRedirectUrl": "https://jayme.dev/r/discord-rpc"
            }
        },
        "timestamps": {
            "startTimestamp": null,
            "endTimestamp": null,
            "useTimer": false
        }
    }
}
```

### This is one of many use cases I've experimented with throughout development, preview shown below.

![Q-dance](https://i.jayme.dev/DZZdMYN.png)

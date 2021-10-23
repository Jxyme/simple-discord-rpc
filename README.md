# simple-discord-rpc

Beautify your Discord profile with a fully customizable Discord Rich Presence, now with buttons.

### Table of Contents
**[Notice](#notice)**<br>
**[Requirements](#requirements)**<br>
**[Usage Instructions](#usage-instructions)**<br>
**[Configuration](#configuration-breakdown)**<br>
**[Timestamps](#timestamp-breakdown)**<br>
**[Example](#discord-rich-presence-example)**

## Notice
If you receive the `RPC_CONNECTION_TIMEOUT` error, please refresh Discord with `CTRL` + `R` whilst Discord is in focus, *then* try again.

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
    "clientId": "Your_developer_application_client_id_goes_here",
    "rich_presence": {
        "details": "First_row_below_title",
        "state": "Second_row_below_title",
        "assets": {
            "largeImageText": "Text_shown_on_large_image_hover",
            "largeImageKey": "Large_image_to_the_left_of_content",
            "smallImageText": "Text_shown_on_small_image_hover",
            "smallImageKey": "Small_image_to_the_left_of_content"
        },
        "buttons": {
            "primary": {
                "buttonLabelText": "Primary Button Text",
                "buttonRedirectUrl": "http://example.com/"
            },
            "secondary": {
                "buttonLabelText": "Secondary Button Text",
                "buttonRedirectUrl": "https://example.com/"
            }
        },
        "timestamps": {
            "startTimestamp": "Optional_epoch_start_timestamp_without_quotes",
            "endTimestamp": "Optional_epoch_end_timestamp_without_quotes",
            "useTimer": "True_or_false_without_quotes"
        }
    }
}
```

![Breakdown](https://raw.githubusercontent.com/Jxyme/simple-discord-rpc/main/screenshots/8zptsNqx.png)

| Location                           	| Configuration             	| Notes                                                         	|
|------------------------------------	|---------------------------	|---------------------------------------------------------------	|
| First row below title              	| details                   	|                                                               	|
| Second row below title             	| state                     	|                                                               	|
| Third row below title              	| timestamps.startTimestamp 	| Converted to a format such as `12:34:56 elapsed`              	|
|                                    	| timestamps.endTimestamp   	| Converted to a format such as `12:34:56 remaining`            	|
| First button at the bottom         	| buttons.primary           	| Button can display any text, and have a link/url assigned     	|
| Second button at the bottom        	| buttons.secondary         	| Button can display any text, and have a link/url assigned     	|
| Text shown on large image:hover    	| assets.largeImageText     	|                                                               	|
| Large image to the left of content 	| assets.largeImageKey      	| Four rows high, includes the title but not the bottom buttons 	|
| Text shown on small image:hover    	| assets.smallImageText     	|                                                               	|
| Small image to the left of content 	| assets.smallImageKey      	| Small icon inset on the bottom right of the `largeImageKey`   	|

Sending `endTimestamp` will **always** have the time displayed as "remaining" until the given time. Sending `startTimestamp` will show "elapsed" as long as there is no `endTimestamp` sent.

## Timestamp Breakdown

### Show/hide timestamp

The **useTimer** setting accepts either `true` or `false`. If you want to enable the timer, set it to `true`. Otherwise, set it to `false`.

---

### Time elapsed

Setting **startTimestamp** and **endTimestamp** to `null` whilst useTimer is `true` will display the time elapsed since the RPC was started.
```json
"timestamps": {
    "startTimestamp": null,
    "endTimestamp": null,
    "useTimer": true
}
```
For example, if I started the RPC at `Sat, 23 Oct 2021 09:00:00 UTC` it will display `00:00 elapsed` and from there, it will increase.

---

Setting **startTimestamp** to an [Epoch](https://www.epochconverter.com/) value and **endTimestamp** to `null` will display the time elapsed since the start Epoch time/date.
```json
"timestamps": {
    "startTimestamp": 1634981400,
    "endTimestamp": null,
    "useTimer": true
}
```
For example, the **startTimestamp** is equal to `Sat, 23 Oct 2021 09:30:00 UTC` whilst the **endTimestamp** is equal to `null`.
- If I started the RPC at `Sat, 23 Oct 2021 09:45:00 UTC` it will display `15:00 elapsed`.

---

### Time left

Setting **startTimestamp** and **endTimestamp** to an [Epoch](https://www.epochconverter.com/) value, with the **endTimestamp** being greater, will display the time left.
```json
"timestamps": {
    "startTimestamp": 1634982600,
    "endTimestamp": 1634983200,
    "useTimer": true
}
```
For example, the **startTimestamp** is equal to `Sat, 23 Oct 2021 09:50:00 UTC` whilst the **endTimestamp** is equal to `10:00:00 UTC`.<br>
- If I started the RPC anywhere between `09:50:00 UTC - 10:00:00 UTC` it will display the time left until `10:00:00 UTC`.

---

Setting **startTimestamp** to `null` and **endTimestamp** to an [Epoch](https://www.epochconverter.com/) value will display the time left until the end Epoch time/date is met.
```json
"timestamps": {
    "startTimestamp": null,
    "endTimestamp": 1634984400,
    "useTimer": true
}
```
For example, the **startTimestamp** is equal to `null` whilst the **endTimestamp** is equal to `Sat, 23 Oct 2021 10:20:00 UTC`.<br>
- If I started the RPC at `10:00:00 UTC` it will display `20:00 left`.

---

### Please note, Discord currently limits the timestamps to a maximum of 24 hours left or elapsed.

 - For example, if you set the **startTimestamp** to `Sat, 23 Oct 2021 10:45:00 UTC` and the **endTimestamp** to `Sat 24 Oct 2021 10:50:00 UTC` the timer will display `05:00 left` instead of `24:05:00 left`.

---

## Discord Rich Presence Example

### `config.json`
```json
{
    "clientId": "792839335723663411",
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
            "startTimestamp": 1609437650,
            "endTimestamp": 1612065650,
            "useTimer": true
        }
    }
}
```

### This is one of many use cases I've experimented with throughout development, preview shown below.

![Q-dance](https://raw.githubusercontent.com/Jxyme/simple-discord-rpc/main/screenshots/0abmzPzA.png)

# simple-discord-rpc

Beautify your Discord profile with a customisable Rich Presence, now with custom buttons, _and_ [Activity Types](#types).

## Table of Contents

### Getting Started

- [Requirements](#requirements)
- [Usage Instructions](#usage-instructions)

### Configuration File

- [Timestamps](#timestamps)
- [Assets](#assets)
- [Buttons](#buttons)
- [Types](#types)

### Example

- [Tomorrowland Brasil 2024](#tomorrowland-brasil-2024)

# Getting Started

## Requirements

[Node.js](https://nodejs.org/en/download)

[Discord Developer Application](https://discord.com/developers/applications)

> [!IMPORTANT]
> Discord must be open in the background, and logged-in on the same machine as `simple-discord-rpc`.

[Discord Desktop Application](https://discord.com/download)

## Usage Instructions

1. Download the latest `Source code (zip)` under `Assets` from the [releases page](https://github.com/Jxyme/simple-discord-rpc/releases/latest) on GitHub.

2. Extract `Source code (zip)` to your Desktop, then open the folder: `simple-discord-rpc-2.0.0`.

3. Open `config.js` in your chosen text editor, and modify the Rich Presence to your liking before saving.

4. Hold `Shift` + `Right-click` inside the folder and click `Open in Terminal` / `Open PowerShell window here`.

5. Run `npm i` for the first time, then run `node .` or `node src/index.js` to start-up `simple-discord-rpc`.

# Configuration File

## Timestamps

Convert a human-readable date to a unix timestamp using [EpochConverter](https://www.epochconverter.com/), or a Discord favourite: [HammerTime](https://hammertime.cyou/).

### Example

Time elapsed since `1735689600` (human-readable date: `01/01/2025 00:00:00 (GMT)`).

```js
{
  timestamps: {
    startTimestamp: 1735689600, // 470:59:05 at the time of writing this
    endTimestamp: undefined
  }
}
```

> [!TIP]
> You can now write Javascript in the `config.js` file to specify the `startTimestamp` and `endTimestamp`.

### Examples

Display your local time, converted to a `hh:mm:ss` (24 hour) format such as `12:01:00` (1 minute past midday).

```js
{
  timestamps: {
    startTimestamp: new Date().setHours(0, 0, 0, 0), // time elapsed since midnight
    endTimestamp: undefined
  }
}
```

Countdown to an hour from now (the time will start from the moment you run `simple-discord-rpc`).

```js
{
  timestamps: {
    startTimestamp: Date.now(), // now as a unix timestamp
    endTimestamp: Date.now() + 60 * 60 * 1000 // now + 1 hour in milliseconds
  }
}
```

> [!NOTE]
> The activity `type` must be set to Listening (`2`), or Watching (`3`) when the `endTimestamp` is also provided.

## Assets

### Example

```js
{
  assets: {
    largeImageKey: 'heart', // asset named 'heart' I uploaded via the Developer Portal
    largeImageText: '♥', // text displayed when hovering over the largeImageKey
    smallImageKey: undefined,
    smallImageText: undefined,
  }
}
```

> [!TIP]
> You can now specify an external URL, as long as it meets the dimensions and size requirements for an asset.

### Example

```js
{
  assets: {
    largeImageKey: 'https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/4x.gif', // catJAM
    largeImageText: 'Meow', // text displayed when hovering over the largeImageKey
    smallImageKey: undefined,
    smallImageText: undefined,
  }
}
```

## Buttons

> [!NOTE]
> Buttons _may_ not render on your end, but other users on Discord will be able to see and interact with them.

### Example

```js
{
  buttons: {
    primary: {
      label: 'GitHub',
      url: 'https://github.com/Jxyme/'
    },
    secondary: {
      label: undefined,
      url: undefined
    }
  }
}
```

## Types

> [!NOTE]
> The `activity` object is limited to a `type` of Playing (`0`), Listening (`2`), Watching (`3`), or Competing (`5`).

### Playing (`0`)

```js
{
  type: 0
}
```

#### Examples

![Playing](/screenshots/playing-fields-v2.png)

| Location                                 | Field Name        | Notes                                                                                                   |
| ---------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------- |
| First row below title                    | details           |                                                                                                         |
| Second row below title                   | state             | If provided with no `partySize` or `partyMax`                                                           |
| First badge in the last row below title  | startTimestamp    | Converted to a `mm:ss` format such as `12:01`                                                           |
| Second badge in the last row below title | state             | If provided with a `partySize` and `partyMax`                                                           |
| Second badge in the last row below title | partySize         | In parenthesis next to the `state`, first number in the format `(1 of 4)`                               |
| Second badge in the last row below title | partyMax          | In parenthesis next to the `state`, second number in the format `(1 of 4)`                              |
| First button at the bottom               | buttons.primary   | Button has the text `buttons.primary.label` and when clicked links to the url `buttons.primary.url`     |
| Second button at the bottom              | buttons.secondary | Button has the text `buttons.secondary.label` and when clicked links to the url `buttons.secondary.url` |
| Large image to the left of any content   | largeImageKey     | Four rows high, includes the title but not the bottom buttons                                           |
| Small image to the left of any content   | smallImageKey     | Small icon inset on the bottom right of the `largeImageKey`                                             |

### Listening (`2`)

```js
{
  type: 2
}
```

#### Examples

![Listening](/screenshots/listening-fields-v2.png)

| Location                                 | Field Name        | Notes                                                                                                   |
| ---------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------- |
| First row below title                    | details           |                                                                                                         |
| Second row below title                   | state             |                                                                                                         |
| First badge in the last row below title  | startTimestamp    | Converted to a `mm:ss` format such as `12:01`                                                           |
| Second badge in the last row below title | endTimestamp      | If provided with `startTimestamp`, converted to a `mm:ss` format such as `12:01`                        |
| First button at the bottom               | buttons.primary   | Button has the text `buttons.primary.label` and when clicked links to the url `buttons.primary.url`     |
| Second button at the bottom              | buttons.secondary | Button has the text `buttons.secondary.label` and when clicked links to the url `buttons.secondary.url` |
| Large image to the left of any content   | largeImageKey     | Four rows high, includes the title but not the bottom buttons                                           |
| Small image to the left of any content   | smallImageKey     | Small icon inset on the bottom right of the `largeImageKey`                                             |

### Watching (`3`)

```js
{
  type: 3
}
```

#### Examples

![Watching](/screenshots/watching-fields-v2.png)

| Location                                 | Field Name        | Notes                                                                                                   |
| ---------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------- |
| First row below title                    | details           |                                                                                                         |
| Second row below title                   | state             |                                                                                                         |
| First badge in the last row below title  | startTimestamp    | Converted to a `mm:ss` format such as `12:01`                                                           |
| Second badge in the last row below title | endTimestamp      | If provided with `startTimestamp`, converted to a `mm:ss` format such as `12:01`                        |
| First button at the bottom               | buttons.primary   | Button has the text `buttons.primary.label` and when clicked links to the url `buttons.primary.url`     |
| Second button at the bottom              | buttons.secondary | Button has the text `buttons.secondary.label` and when clicked links to the url `buttons.secondary.url` |
| Large image to the left of any content   | largeImageKey     | Four rows high, includes the title but not the bottom buttons                                           |
| Small image to the left of any content   | smallImageKey     | Small icon inset on the bottom right of the `largeImageKey`                                             |

### Competing (`5`)

```js
{
  type: 5
}
```

#### Example

![Competing](/screenshots/competing-fields-v2.png)

| Location                               | Field Name        | Notes                                                                                                   |
| -------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------- |
| First row below title                  | details           |                                                                                                         |
| Second row below title                 | state             |                                                                                                         |
| First button at the bottom             | buttons.primary   | Button has the text `buttons.primary.label` and when clicked links to the url `buttons.primary.url`     |
| Second button at the bottom            | buttons.secondary | Button has the text `buttons.secondary.label` and when clicked links to the url `buttons.secondary.url` |
| Large image to the left of any content | largeImageKey     | Four rows high, includes the title but not the bottom buttons                                           |
| Small image to the left of any content | smallImageKey     | Small icon inset on the bottom right of the `largeImageKey`                                             |

> [!WARNING]
> The layout may be subject to change without warning. Please keep this in mind when visiting at a later date.

# Example

## Tomorrowland Brasil 2024

### `config.js`

```js
module.exports = {
  applicationId: '1327713183372284027',
  activity: {
    details: 'Amber Broos',
    state: 'Next: NERVO',
    party: {
      partySize: undefined,
      partyMax: undefined,
    },
    timestamps: {
      startTimestamp: new Date('2024-10-12 17:40:00').getTime(),
      endTimestamp: new Date('2024-10-12 18:40:00').getTime(),
    },
    assets: {
      largeImageKey: 'https://owr-schedule-cdn.tomorrowland.com/1585774431.jpg',
      largeImageText: 'Amber Broos',
      smallImageKey: 'https://owr-schedule-cdn.tomorrowland.com/1358567301.jpeg',
      smallImageText: 'NERVO',
    },
    buttons: {
      primary: {
        label: 'Live Stream',
        url: 'https://www.youtube.com/live/NC8P2lH_uYw',
      },
      secondary: {
        label: 'Stream Schedule',
        url: 'https://www.instagram.com/p/DA6NNcvuOx-',
      },
    },
    type: 3,
  },
  connection: {
    maxRetries: 7,
    retryInterval: 10,
  },
}
```

|                        User Pop-out                         |                        User Profile                         |
| :---------------------------------------------------------: | :---------------------------------------------------------: |
| ![Tomorrowland Brasil 2024](/screenshots/rpc-example-1.png) | ![Tomorrowland Brasil 2024](/screenshots/rpc-example-2.png) |

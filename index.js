const chalk = require('chalk');
const { Client } = require('discord-rpc');
const client = new Client({
    transport: 'ipc'
});

const config = require('./config.json');

const SUCCESS = chalk.hex('#43B581');
const ERROR = chalk.hex('#F04747');
const INFO = chalk.hex('#FF73FA');
const LOG = chalk.hex('#44DDBF');

/* Adds [LOG] and [dd/mm/yyyy | hh:mm:ss UTC] prefix to all console.log's */

let originalConsoleLog = console.log;
console.log = function () {
    args = [];
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getUTCHours().toString().padStart(2, '0');
    let minutes = date.getUTCMinutes().toString().padStart(2, '0');
    let seconds = date.getUTCSeconds().toString().padStart(2, '0');
    args.push(`${LOG(`[LOG]`)} ${INFO(`[${day}/${month}/${year} | ${hours}:${minutes}:${seconds} UTC]`)}`);
    for (let i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    originalConsoleLog.apply(console, args);
}

/* Adds [ERROR] and [dd/mm/yyyy | hh:mm:ss UTC] prefix to all console.error's */

let originalConsoleError = console.error;
console.error = function () {
    args = [];
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getUTCHours().toString().padStart(2, '0');
    let minutes = date.getUTCMinutes().toString().padStart(2, '0');
    let seconds = date.getUTCSeconds().toString().padStart(2, '0');
    args.push(`${ERROR(`[ERROR]`)} ${INFO(`[${day}/${month}/${year} | ${hours}:${minutes}:${seconds} UTC]`)}`);
    for (let i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    originalConsoleError.apply(console, args);
}

console.log(INFO('Attempting to connect, please wait... (if it fails, "CTRL+R" in Discord and try again)'));

let protocol = new RegExp('^(http|https)://');
let startTimestamp = new Date();
let rpc = config.rich_presence;

let initialTasks = [validateConfig, updatePresence],
    i = 0;

/* Consecutively execute initialTasks before updating the user's profile (onStartup only) */

function onStartup() {
    initialTasks[i++]();
    if (i < initialTasks.length) {
        setTimeout(onStartup, 5 * 1000); // 5 seconds
    }
}

/* Ensure the user's config meets all the requirements */

function validateConfig() {
    console.log(INFO(`Validating configuration...`));
    if (rpc.details && rpc.details.length > 128) {
        return console.error(ERROR(`Details provided exceeds the maximum character length of 128.`));
    } else if (rpc.details && rpc.details.length < 2) {
        return console.error(ERROR(`Details provided does not meet the minimum character length of 2.`));
    }
    if (rpc.state && rpc.state.length > 128) {
        return console.error(ERROR(`State provided exceeds the maximum character length of 128.`));
    } else if (rpc.state && rpc.state.length < 2) {
        return console.error(ERROR(`State provided does not meet the minimum character length of 2.`));
    }
    if (rpc.assets.largeImageText && rpc.assets.largeImageText.length > 32) {
        return console.error(ERROR(`LargeImageText provided exceeds the maximum character length of 32.`));
    } else if (rpc.assets.largeImageText && rpc.assets.largeImageText.length < 2) {
        return console.error(ERROR(`LargeImageText provided does not meet the minimum character length of 2.`));
    }
    if (rpc.assets.smallImageText && rpc.assets.smallImageText.length > 32) {
        return console.error(ERROR(`SmallImageText provided exceeds the maximum character length of 32.`));
    } else if (rpc.assets.smallImageText && rpc.assets.smallImageText.length < 2) {
        return console.error(ERROR(`SmallImageText provided does not meet the minimum character length of 2.`));
    }
    if (!rpc.buttons.primary.buttonLabelText || !rpc.buttons.secondary.buttonLabelText) {
        return console.error(ERROR(`ButtonLabelText(s) provided does not meet the minimum character length of 1.`));
    } else if (rpc.buttons.primary.buttonLabelText.length > 128 || rpc.buttons.secondary.buttonLabelText.length > 128) {
        return console.error(ERROR(`ButtonLabelText(s) provided exceeds the maximum character length of 128.`));
    }
    if (!protocol.test(rpc.buttons.primary.buttonRedirectUrl.toString())) {
        return console.error(ERROR(`ButtonRedirectUrl(s) provided does not contain either "http://" OR "https://".`));
    }
    if (rpc.timestamps.startTimestamp && !(new Date(rpc.timestamps.startTimestamp)).getTime() > 0 || rpc.timestamps.startTimestamp === '' ||
        rpc.timestamps.endTimestamp && !(new Date(rpc.timestamps.endTimestamp)).getTime() > 0 || rpc.timestamps.endTimestamp === '') {
        return console.error(ERROR(`Timestamp(s) provided is not valid. Ensure you have provided an Epoch type.`));
    }
    console.log(SUCCESS(`Configuration is valid! Attempting to update ${client.user.username}#${client.user.discriminator}'s Rich Presence...`));
}

/* Update user's Rich Presence */

function updatePresence() {
    console.log(INFO(`Successfully updated ${client.user.username}#${client.user.discriminator}'s Rich Presence!`));
    return client.request('SET_ACTIVITY', {
        pid: process.pid,
        activity: {
            details: rpc.details ? rpc.details : undefined,
            state: rpc.state ? rpc.state : undefined,
            assets: {
                large_text: rpc.assets.largeImageText ? rpc.assets.largeImageText : undefined,
                large_image: rpc.assets.largeImageKey ? rpc.assets.largeImageKey : undefined,
                small_text: rpc.assets.smallImageText ? rpc.assets.smallImageText : undefined,
                small_image: rpc.assets.smallImageKey ? rpc.assets.smallImageKey : undefined
            },
            buttons: [{
                    label: rpc.buttons.primary.buttonLabelText,
                    url: rpc.buttons.primary.buttonRedirectUrl
                },
                {
                    label: rpc.buttons.secondary.buttonLabelText,
                    url: rpc.buttons.secondary.buttonRedirectUrl
                }
            ],
            timestamps: {
                start: rpc.timestamps.useTimer ? Number(rpc.timestamps.startTimestamp) || Number(startTimestamp) : undefined,
                end: rpc.timestamps.useTimer ? Number(rpc.timestamps.endTimestamp) : undefined
            },
            instance: true
        }
    });
}

/* Once the client is ready, call onStartup() to execute initialTasks */

client.on('ready', async () => {
    console.log(SUCCESS(`Successfully authorised as ${client.user.username}#${client.user.discriminator}`));
    try {
        onStartup();
    } catch (err) {
        console.error(ERROR(err));
    }
});

/* Login using the user's Discord Developer Application ID */

client.login({ clientId: config.clientId }).catch(ERROR(console.error));
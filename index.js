const chalk = require('chalk');
const { Client } = require('discord-rpc');
let client = new Client({
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

let retryDuration = 15; // Retry in 15 seconds by default

console.log(LOG(`Attempting to connect to Discord, please wait ${retryDuration} seconds...`));

connectToDiscord();

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
        console.error(ERROR(`Details provided exceeds the maximum character length of 128.`));
        return process.exit(0)
    } else if (rpc.details && rpc.details.length < 2) {
        console.error(ERROR(`Details provided does not meet the minimum character length of 2.`));
        return process.exit(0)
    }
    if (rpc.state && rpc.state.length > 128) {
        console.error(ERROR(`State provided exceeds the maximum character length of 128.`));
        return process.exit(0)
    } else if (rpc.state && rpc.state.length < 2) {
        console.error(ERROR(`State provided does not meet the minimum character length of 2.`));
        return process.exit(0)
    }
    if (rpc.assets.largeImageText && rpc.assets.largeImageText.length > 32) {
        console.error(ERROR(`LargeImageText provided exceeds the maximum character length of 32.`));
        return process.exit(0)
    } else if (rpc.assets.largeImageText && rpc.assets.largeImageText.length < 2) {
        console.error(ERROR(`LargeImageText provided does not meet the minimum character length of 2.`));
        return process.exit(0)
    }
    if (rpc.assets.smallImageText && rpc.assets.smallImageText.length > 32) {
        console.error(ERROR(`SmallImageText provided exceeds the maximum character length of 32.`));
        return process.exit(0)
    } else if (rpc.assets.smallImageText && rpc.assets.smallImageText.length < 2) {
        console.error(ERROR(`SmallImageText provided does not meet the minimum character length of 2.`));
        return process.exit(0)
    }
    if (rpc.buttons.primary.label && rpc.buttons.primary.url) {
        if (rpc.buttons.primary.label.length > 128) {
            console.error(ERROR(`Primary button label provided exceeds the maximum character length of 128.`));
            return process.exit(0)
        } else if (rpc.buttons.primary.label.length < 2) {
            console.error(ERROR(`Primary button label provided does not meet the minimum character length of 2.`));
            return process.exit(0)
        }
    } else {
        console.log(LOG(`Primary button label and/or url provided is undefined. No primary button will be displayed.`));
    }
    if (rpc.buttons.primary.url) {
        if (rpc.buttons.primary.url.length > 0 && rpc.buttons.primary.url.length <= 32) {
            if (!protocol.test(rpc.buttons.primary.url.toString())) {
                console.error(ERROR(`Primary button url provided does not contain either "http://" OR "https://".`));
                return process.exit(0)
            }
        } else {
            console.error(ERROR(`Primary button url provided exceeds the maximum character length of 32.`));
            return process.exit(0)
        }
    }
    if (rpc.buttons.secondary.label && rpc.buttons.secondary.url) {
        if (rpc.buttons.secondary.label.length > 128) {
            console.error(ERROR(`Secondary button label provided exceeds the maximum character length of 128.`));
            return process.exit(0)
        } else if (rpc.buttons.secondary.label.length < 2) {
            console.error(ERROR(`Secondary button label provided does not meet the minimum character length of 2.`));
            return process.exit(0)
        }
    } else {
        console.log(LOG(`Secondary button label and/or url provided is undefined. No secondary button will be displayed.`));
    }
    if (rpc.buttons.secondary.url) {
        if (rpc.buttons.secondary.url.length > 0 && rpc.buttons.secondary.url.length <= 32) {
            if (!protocol.test(rpc.buttons.secondary.url.toString())) {
                console.error(ERROR(`Secondary button url provided does not contain either "http://" OR "https://".`));
                return process.exit(0)
            }
        } else {
            console.error(ERROR(`Secondary button url provided exceeds the maximum character length of 32.`));
            return process.exit(0)
        }
    }
    if (rpc.timestamps.useTimer) {
        if (rpc.timestamps.startTimestamp && !(new Date(rpc.timestamps.startTimestamp)).getTime() > 0 || rpc.timestamps.startTimestamp === '') {
            console.error(ERROR(`'${rpc.timestamps.startTimestamp}' is not a valid startTimestamp. See here for more information: https://www.epochconverter.com/`));
            return process.exit(0)
        }
        if (rpc.timestamps.endTimestamp && !(new Date(rpc.timestamps.endTimestamp)).getTime() > 0 || rpc.timestamps.endTimestamp === '') {
            console.error(ERROR(`'${rpc.timestamps.endTimestamp}' is not a valid endTimestamp. See here for more information: https://www.epochconverter.com/`));
            return process.exit(0)
        }
    }
    console.log(SUCCESS(`Configuration is valid! Attempting to update ${client.user.username}#${client.user.discriminator}'s Rich Presence...`));
}

/* Update user's Rich Presence */

function updatePresence() {
    let buttons = [];
    let buttonObj = Object.values(rpc.buttons);
    buttonObj.forEach((button) => {
        if (button.label && button.url !== null) {
            buttons.push(button);
        }
    });
    if (!buttons.length) {
        buttons = false;
    }
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
            buttons: buttons ? buttons : undefined,
            timestamps: {
                start: rpc.timestamps.useTimer ? Number(rpc.timestamps.startTimestamp) || Number(startTimestamp) : undefined,
                end: rpc.timestamps.useTimer && rpc.timestamps.endTimestamp !== null ? Number(rpc.timestamps.endTimestamp) : undefined
            },
            instance: true
        }
    });
}

/* Login using the user's Discord Developer Application ID */

function connectToDiscord() {
    /* If a previous attempt was made, destroy the client before retrying */
    if (client) {
        client.destroy();
        client = new Client({
            transport: 'ipc'
        });
    }
    /* Once the client is ready, call onStartup() to execute initialTasks */
    client.on('ready', async () => {
        console.log(SUCCESS(`Successfully authorised as ${client.user.username}#${client.user.discriminator}`));
        onStartup();
    });
    /* If the client fails to connect, automatically retry in duration specified */
    setTimeout(() => {
        client.login({ clientId: config.clientId });
    }, retryDuration * 1000)
}

/* Handle 'Could not connect' error, proceed to retry if attempt fails */

process.on('unhandledRejection', err => {
    if (err.message === 'Could not connect') {
        console.log(ERROR(`Unable to connect to Discord. Is Discord running and logged-in in the background?`));
        console.log(LOG(`Automatically retrying to connect, please wait ${retryDuration} seconds...`));
        connectToDiscord();
    }
});
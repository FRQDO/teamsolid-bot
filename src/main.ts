import Discord from 'discord.js';
import { config } from './config.js';
import { good_bot_bad_bot } from './good_bot_bad_bot.js';
import { help } from './help.js';
import { log_received_message } from './log.js';
import { olid } from './olid.js';
import { quotes } from './quotes.js';
import { yes_no } from './yes_no.js';


export const client = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    console.log(`${config.bot_name} is ready.`);
});

// Create an event listener for messages
client.on('message', message => {
    log_received_message(message);
    help(message);
    olid(message);
    good_bot_bad_bot(message);
    quotes(message);
    yes_no(message);
});

client.login(config.token)
    .then(() => console.log('Logging in ...'))
    .catch(console.error);

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import Discord from 'discord.js';

import { IConfig } from './IConfig.js';
import { log_received_message, } from './log.js';
import { olid } from './olid.js';
import { help } from './help.js';
import { good_bot_bad_bot } from './good_bot_bad_bot.js';


// Load Configuration
const relative_config_path = '../settings.json';
const script_dir: string = path.dirname(fileURLToPath(import.meta.url));
const absolute_config_path: string = path.resolve(script_dir, relative_config_path);
const file_string: string = fs.readFileSync(absolute_config_path, 'utf-8');
export const config: IConfig = JSON.parse(file_string) as IConfig;


const client = new Discord.Client();

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
    olid(message);
    help(message);
    good_bot_bad_bot(message);
});

client.login(config.token)
    .then(() => console.log('Logging in ...'))
    .catch(console.error);

import { Message } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { config } from './config.js';
import { log_sended_message } from './log.js';
import { choice } from './utils.js';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IYesNo extends Array<string> {}


const command = 'yesno';
const c = 'yn';
export const yes_no_help =
    `${config.prefix}${command}/${config.prefix}${c} - Helps you to decide whether or not you should ...`;

// Load
const file_name = 'yes_no.json';
const absolute_yes_no_path: string = path.resolve(config.data_dir, file_name);
let file_string: string;
let yes_no_data: IYesNo;
if (fs.existsSync(absolute_yes_no_path)) {
    file_string = fs.readFileSync(absolute_yes_no_path, 'utf-8');
    yes_no_data = JSON.parse(file_string) as IYesNo;
} else {
    yes_no_data = [];
}

export function yes_no(message: Message): void {
    if (message.content.trim() === `${config.prefix}${command}` || message.content.trim() === `${config.prefix}${c}`) {
        message.channel.send(choice(yes_no_data))
            .then(log_sended_message)
            .catch(console.error);
    }
}

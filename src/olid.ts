import { Message } from 'discord.js';
import { config } from './config.js';
import { log_sended_message } from './log.js';
import { choice } from './utils.js';


const command = 'olid';
const c = 'o';
export const olid_help =
    `${config.prefix}${command}/${config.prefix}${c} - Greet with a friendly: “Olid!”`;

const olidlist: string[] = [
    'Olid!',
    'OLID!',
    'O L I D',
    'O L I D!',
    'olid',
    'olaf',
    'OLID',
    '*Olid*',
    '**olid**',
    '***OlId***',
    // '```\n' +
    // rektangle('OLID', randint(2, 6), randint(2, 6)) +
    // '```\n',
    '__olid__',
    'https://i.imgur.com/JW6YLy9.jpg',
];


export function olid(message: Message): void {
    if (message.content.trim() === `${config.prefix}${command}` || message.content.trim() === `${config.prefix}${c}`) {
        message.channel.send(choice(olidlist))
            .then(log_sended_message)
            .catch(console.error);
    }
}

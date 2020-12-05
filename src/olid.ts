import { Message } from 'discord.js';
import { config } from './main.js';
import { choice } from './utils.js';
import { log_sended_message } from './log.js';


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
    if (message.content === `${config.prefix}olid`) {
        message.channel.send(choice(olidlist))
            .then(log_sended_message)
            .catch(console.error);
    }
}
import path from 'path';
import { fileURLToPath } from 'url';

import Discord, { TextChannel, NewsChannel, Message } from 'discord.js';

import { IConfig } from './IConfig.js';
import { readSync } from './fs.js';


const relative_config_path = '../settings.json';
const script_dir: string = path.dirname(fileURLToPath(import.meta.url));
const absolute_config_path: string = path.resolve(script_dir, relative_config_path);
const file_string: string = readSync(absolute_config_path);
const config: IConfig = JSON.parse(file_string) as IConfig;

const help_text =
    `Hello, this is ${config.bot_name}. :wave:

Commands

${config.prefix}help: Display this help.`;

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

/**
 * Selects a random element of a given array.
 * @param  {string[]} arr
 * @returns string
 */
function choice(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
}

/*
def rektangle(text, width=1, height=1):
    result = [' '.join(['{}'.format(i) for i in text])]
    for i in range(1, len(text) - 1):
        result.append(text[i] + ' ' * ((len(text) - 2)
                                       * 2 + 1) + text[len(text) - i - 1])
    result.append(' '.join(['{}'.format(i) for i in text[::-1]]))
    for _ in range(1, width):
        result = [line + line[-2:-2 * len(text):-1] for line in result]
    for _ in range(1, height):
        result.extend(result[-2:-len(text) - 1:-1])
    result = '\n'.join(result)
    return result.format(*list(text))
*/

/**
 * Example:
 * rektangle('rekt', 2, 2):
 *
 * r e k t k e r
 * e     k     e
 * k     e     k
 * t k e r e k t
 * k     e     k
 * e     k     e
 * r e k t k e r
 *
 * @param  {string} text
 * @param  {} width=1
 * @param  {} height=1
 * @returns string
 */
// function rektangle(text: string, width = 1, height = 1): string {
//     // TODO
//     return '';
// }


// Create an instance of a Discord client
const client = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    console.log(`${config.bot_name} is ready.`);
});

function logReceivedMessage(message: Message): void {
    const server = message.guild?.name ?? '';
    const channel = (message.channel as TextChannel | NewsChannel).name ?? '';
    const client = message.author.username;
    console.log(`Receiving from ${server},${channel},${client}:${message.content}`);
}

function logSendedMessage(message: Message): void {
    console.log(`Sending: ${message.content}`);
}

// Create an event listener for messages
client.on('message', message => {
    logReceivedMessage(message);

    if (message.content === `${config.prefix}olid`) {
        message.channel.send(choice(olidlist))
            .then(logSendedMessage)
            .catch(console.error);
    } else if (message.content === `${config.prefix}help`) {
        message.channel.send(help_text)
            .then(logSendedMessage)
            .catch(console.error);
    }
    if (message.content.toLocaleLowerCase().includes('good bot')
        || message.content.toLocaleLowerCase().includes('guter bot')
    ) {
        message.react('🤗')
            .then(() => console.log('Reacting: 🤗'))
            .catch(console.error);
    }
    if (message.content.toLocaleLowerCase().includes('bad bot')
        || message.content.toLocaleLowerCase().includes('böser bot')
    ) {
        message.react('😭')
            .then(() => console.log('Reacting: 😭'))
            .catch(console.error);
    }
});

// Log our bot in using the token from https://discord.com/developers/applications
client.login(config.token)
    .then(() => console.log('Logging in ...'))
    .catch(console.error);

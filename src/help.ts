import { Message } from 'discord.js';
import { log_sended_message } from './log.js';
import { config } from './main.js';


const help_text =
    `Hello, this is ${config.bot_name}. :wave:

Commands

${config.prefix}help: Display this help.`;

export function help(message: Message): void {

    if (message.content === `${config.prefix}help`) {
        message.channel.send(help_text)
            .then(log_sended_message)
            .catch(console.error);
    }
}
import { Message } from "discord.js";
import { config_object } from "./config.js";
import { log_sended_message } from "./log.js";
import { olid_help } from "./olid.js";
import { quotes_help } from "./quotes.js";
import { yes_no_help } from "./yes_no.js";
import { markov_help } from "./markov.js";
import { mock_help } from "./mock.js";


const command = "help";
const c = "h";
const help_text =
    `Hello, I am ${config_object.data.bot_name}. :wave:

Commands:

${config_object.data.prefix}${command}/${config_object.data.prefix}${c} - Display this help text.

${olid_help}

${quotes_help}

${yes_no_help}

${mock_help}

${markov_help}`;

export function help(message: Message): void {
    if (message.content.trim() === `${config_object.data.prefix}${command}` || message.content.trim() === `${config_object.data.prefix}${c}`) {
        message.channel.send(help_text)
            .then(log_sended_message)
            .catch(console.error);
    }
}
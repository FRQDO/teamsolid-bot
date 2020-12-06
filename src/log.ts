import { Message, NewsChannel, TextChannel } from 'discord.js';
import fs from 'fs';
import { resolve } from 'path';
import { config } from './config.js';
import { client } from './main.js';

export function log_received_message(message: Message): void {
    log_to_file(message);
    const server: string = message.guild?.name ?? '';
    const channel: string = (message.channel as TextChannel | NewsChannel).name ?? '';
    const username: string = message.author.username;
    const log_prefix: string = server + channel !== '' ? `${server},${channel},${username}` : `${username}`;
    console.log(`Receiving from ${log_prefix}:${message.content}`);
}

export function log_sended_message(message: Message): void {
    console.log(`Sending: ${message.content}`);
}

/**
 * Logs messages to a file.
 * Does not log its own messages.
 * Does not log bot commands.
 *
 * @param  {Message} message
 * @returns void
 */
function log_to_file(message: Message): void {
    if (
        message.author.id !== client.user?.id &&
        !(
            message.content.startsWith(`${config.prefix}`) ||
            message.content.startsWith(`${config.prefix}`)
        )
    ) {
        const server = message.guild?.name ?? '';
        const channel = (message.channel as TextChannel | NewsChannel).name ?? '';
        const username: string = message.author.username;
        const log_file = server + channel !== '' ? `${server}_${channel}.log` : `${username}.log`;
        const absolute_log_path: string = resolve(config.data_dir, 'log');

        if (fs.existsSync(absolute_log_path)) {
            fs.appendFileSync(resolve(absolute_log_path, log_file), message.content);
        } else {
            fs.mkdirSync(absolute_log_path);
            fs.writeFileSync(resolve(absolute_log_path, log_file), message.content);
        }
        fs.appendFileSync(resolve(absolute_log_path, log_file), '\n');
    }
}
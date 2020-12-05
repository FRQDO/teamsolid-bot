import { Message, NewsChannel, TextChannel } from 'discord.js';


export function log_received_message(message: Message): void {
    const server = message.guild?.name ?? '';
    const channel = (message.channel as TextChannel | NewsChannel).name ?? '';
    const client = message.author.username;
    console.log(`Receiving from ${server},${channel},${client}:${message.content}`);
}

export function log_sended_message(message: Message): void {
    console.log(`Sending: ${message.content}`);
}

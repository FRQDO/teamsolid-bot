import { Client, Message, Intents } from 'https://raw.githubusercontent.com/harmony-org/harmony/main/mod.ts';

import { TOKEN } from './config.ts';
import { INTENTS } from './config.ts';

const client = new Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`);
})

client.on('messageCreate', (msg: Message) => {
    if (msg.content === '!ping') {
        console.log('Command Used: Ping');
        msg.reply('pong!');
    }
})

console.log('harmony - ping example');
console.log(TOKEN.length);

client.connect(TOKEN, INTENTS);

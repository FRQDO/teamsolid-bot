// Import the discord.js module
import Discord, { TextChannel, NewsChannel, Message } from 'discord.js';
import { TOKEN, PREFIX } from './config.js';

// Create an instance of a Discord client
const client = new Discord.Client();


/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    console.log('TeamSolid-Bot is ready.');
});

function logMessage(message: Message): void {
    const server = message.guild?.name ?? '';
    const channel = (message.channel as TextChannel | NewsChannel).name ?? '';
    const client  = message.author.username;
    console.log(`Receiving from ${server},${channel},${client}:${message.content}`);
}

// Create an event listener for messages
client.on('message', message => {

    // If the message is "ping"
    if (message.content === 'ping') {
        logMessage(message);
        // Send "pong" to the same channel
        message.channel.send('pong')
            .then(message => console.log(`Sending: ${message.content}`))
            .catch(console.error);
    }
    // If the message is "what is my avatar"
    if (message.content === 'what is my avatar') {
        // Send the user's avatar URL
        message.reply(message.author.displayAvatarURL())
            .then(console.log)
            .catch(console.error);
    }
});

// Log our bot in using the token from https://discord.com/developers/applications
client.login(TOKEN)
    .then(() => console.log('Logging in ...'))
    .catch(console.error);

new Discord.Collection();
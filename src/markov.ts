import { Message } from 'discord.js';
import { config } from './config.js';
import { MarkovString } from './ts-markov/dist/MarkovString';


new MarkovString();


const command = 'markov';
const c = 'm';
export const olid_help =
    `${config.prefix}${command}/${config.prefix}${c} - Whispers some wisdom of the channel.`;


// Load
// TODO

export function markov(message: Message): void {
    console.log(message);
    // TODO
}

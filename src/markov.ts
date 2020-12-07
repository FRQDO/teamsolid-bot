import { Message } from 'discord.js';
import { config } from './config.js';
import { MarkovString } from './ts-markov/src/MarkovString.js';
import fs from 'fs';
import path from 'path';



new MarkovString();


const command = 'markov';
const c = 'm';
export const markov_help =
    `${config.prefix}${command}/${config.prefix}${c} - Whispers some wisdom of the channel.`;


// Load
const file_name = 'TeamSolid_teamsolid.log';
const absolute_quotes_path: string = path.resolve(config.data_dir, 'log', file_name);


export function markov(message: Message): void {
    if (
        message.content.trim() === `${config.prefix}${command}` ||
        message.content.trim() === `${config.prefix}${c}`
    ) {
        const text = fs.readFileSync(absolute_quotes_path, 'utf-8');
        const markov = new MarkovString();
        const lines = text.split('\n');
        markov.addStates(lines);
        markov.train();
        const response = markov.generateRandom(100);
        message.channel.send(response);
    }
}

import { Message } from 'discord.js';
import { config } from './config.js';
import { MarkovString } from 'ts-markov';
import fs from 'fs';
import path from 'path';
import { get_current_day } from './utils.js';


const command = 'markov';
const c = 'm';
export const markov_help =
    `${config.prefix}${command}/${config.prefix}${c} - Whispers some wisdom of the channel.`;
let last_used = 'never';

// Load
const file_name = 'TeamSolid_teamsolid.log';
const absolute_quotes_path: string = path.resolve(config.data_dir, 'log', file_name);

export function markov(message: Message): void {
    if (
        message.content.trim() === `${config.prefix}${command}` ||
        message.content.trim() === `${config.prefix}${c}`
    ) {
        if (last_used !== get_current_day()) {
            last_used = get_current_day();
            const text = fs.readFileSync(absolute_quotes_path, 'utf-8');
            const markov = new MarkovString();
            const lines = text.split('\n');
            markov.addStates(lines);
            markov.train();
            const response = markov.generateRandom(100);
            message.channel.send(response)
                .then(() => console.log('Reacting: ${response}'))
                .catch(console.error);
        } else {
            const response = 'Nur einmal am Tag!';
            message.channel.send(response)
                .then(() => console.log('Reacting: ${response}'))
                .catch(console.error);
        }
    }
}

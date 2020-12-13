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

const file_name = 'TeamSolid_teamsolid.log';
const absolute_path_log: string = path.resolve(config.data_dir, 'log', file_name);

export function markov(message: Message): void {
    if (
        message.content.trim() === `${config.prefix}${command}` ||
        message.content.trim() === `${config.prefix}${c}`
    ) {
        if (last_used !== get_current_day()) {
            try {
                const text = fs.readFileSync(absolute_path_log, 'utf-8');
                last_used = get_current_day();
                const markov = new MarkovString();
                const lines = text.split('\n');
                markov.addStates(lines);
                markov.train();
                const response = markov.generateRandom(100);
                message.channel.send(response)
                    .then(() => console.log(`Reacting: ${response}`))
                    .catch(console.error);

            } catch (error) {
                console.error(error);
                message.channel.send(`${absolute_path_log} not found.`)
                    .catch(console.error);
            }

        } else {
            const response = 'Nur einmal am Tag!';
            message.channel.send(response)
                .then(() => console.log(`Reacting: ${response}`))
                .catch(console.error);
        }
    }
}
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export interface IConfig {
    token: string;
    prefix: string;
    bot_name: string;
    data_dir: string;
    assets_dir: string;
    markov_last_used?: string;
    twitch: {
        client_id: string;
        client_secret: string;
        streams: string[];
        update_interval: number;
        channel_id: string;
    }
}

// Load Configuration
const relative_config_path = '../settings.json';
const script_dir: string = path.dirname(fileURLToPath(import.meta.url));
const absolute_config_path: string = path.resolve(script_dir, relative_config_path);
let file_string: string;
try {
    file_string = fs.readFileSync(absolute_config_path, 'utf-8');
} catch (error) {
    console.error('settings.json not found.');
    process.exit(1);
}

export const config: IConfig = JSON.parse(file_string) as IConfig;

function save() {
    const config_string = JSON.stringify(config, null, 4);
    fs.writeFileSync(absolute_config_path, config_string);
}

export function set_makrov_last_used(last_used: string): void {
    config.markov_last_used = last_used;
    save();
}

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { IConfig } from './IConfig.js';


// Load Configuration
const relative_config_path = '../settings.json';
const script_dir: string = path.dirname(fileURLToPath(import.meta.url));
const absolute_config_path: string = path.resolve(script_dir, relative_config_path);
const file_string: string = fs.readFileSync(absolute_config_path, 'utf-8');
export const config: IConfig = JSON.parse(file_string) as IConfig;

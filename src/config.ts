import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ITwitchConfig } from "./twitch.js";

export interface IConfig {
    token: string;
    prefix: string;
    bot_name: string;
    data_dir: string;
    assets_dir: string;
    markov_last_used?: string;
    twitch: ITwitchConfig;
}

// Load Configuration
const RELATIVE_CONFIG_PATH = "../settings.json";
const SCRIPT_DIR: string = path.dirname(fileURLToPath(import.meta.url));

class Config {
    data: IConfig;
    absolute_config_path: string

    constructor() {
        this.absolute_config_path = path.resolve(SCRIPT_DIR, RELATIVE_CONFIG_PATH);
        let file_string: string;
        try {
            file_string = fs.readFileSync(this.absolute_config_path, "utf-8");
        } catch (error) {
            console.error("settings.json not found.");
            process.exit(1);
        }
        this.data = JSON.parse(file_string) as IConfig;
    }

    save() {
        const config_string = JSON.stringify(this.data, null, 4);
        fs.writeFileSync(this.absolute_config_path, config_string);
    }

    set_makrov_last_used(last_used: string): void {
        this.data.markov_last_used = last_used;
        this.save();
    }
}

export const config_object = new Config();

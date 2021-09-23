import { Message } from "discord.js";
import fs from "fs";
import path from "path";
import { log_sended_message } from "./log.js";
import { choice } from "./utils.js";
import { config_object } from "./config.js";


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IOlid extends Array<string> {}


const command = "olid";
const c = "o";
export const olid_help =
    `${config_object.data.prefix}${command}/${config_object.data.prefix}${c} - Greet with a friendly: “Olid!”`;


// Load
const file_name = "olid.json";
const absolute_olid_path: string = path.resolve(config_object.data.assets_dir, file_name);
let file_string: string;
let olid_data: IOlid;
if (fs.existsSync(absolute_olid_path)) {
    file_string = fs.readFileSync(absolute_olid_path, "utf-8");
    olid_data = JSON.parse(file_string) as IOlid;
} else {
    olid_data = [];
}


export function olid(message: Message): void {
    if (message.content.trim() === `${config_object.data.prefix}${command}` || message.content.trim() === `${config_object.data.prefix}${c}`) {
        const olid_string = choice(olid_data) ?? "I would say something like “olid” or so, but **SOMEONE** is just not able to cofigure properly. 🤦";
        message.channel.send(olid_string)
            .then(log_sended_message)
            .catch(console.error);
    }
    if (message.content.toLocaleLowerCase().includes("olid")
    ) {
        message.react("👋")
            .then(() => console.log("Reacting: 👋"))
            .catch(console.error);
    }
}

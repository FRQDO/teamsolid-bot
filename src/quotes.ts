import { Message } from "discord.js";
import fs from "fs";
import path from "path";
import { config } from "./config.js";
import { log_sended_message } from "./log.js";
import { choice } from "./utils.js";


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IQuotes extends Array<string> { }


const command = "quote";
const c = "q";
export const quotes_help =
    `${config.prefix}${command}/${config.prefix}${c} - Display a quotation.
${config.prefix}${command}/${config.prefix}${c} <Some fancy quoation> - Save or delete this very quotation.`;

// Load quotes
const file_name = "quotes.json";
const absolute_quotes_path: string = path.resolve(config.data_dir, file_name);
let file_string: string;
let quotes_data: IQuotes;
if (fs.existsSync(absolute_quotes_path)) {
    file_string = fs.readFileSync(absolute_quotes_path, "utf-8");
    quotes_data = JSON.parse(file_string) as IQuotes;
} else {
    quotes_data = [];
}

function save_quotes(): void {
    const quote_string = JSON.stringify(quotes_data, null, 4);
    if (!fs.existsSync(absolute_quotes_path)) {
        fs.mkdirSync(config.data_dir, { recursive: true });
    }
    fs.writeFileSync(absolute_quotes_path, quote_string);
}

export function quotes(message: Message): void {
    if (message.content.trim() === `${config.prefix}${command}` || message.content.trim() === `${config.prefix}${c}`) {
        const quote = choice(quotes_data) ?? "No quotations found ...";
        message.channel.send(quote)
            .then(log_sended_message)
            .catch(console.error);
    } else if (
        message.content.trim().startsWith(`${config.prefix}${command}`) ||
        message.content.trim().startsWith(`${config.prefix}${c}`)
    ) {
        // Save or Delete quote
        let prefix_length = 0;
        if (message.content.trim().startsWith(`${config.prefix}${command}`)) {
            prefix_length = `${config.prefix}${command}`.length;
        } else {
            prefix_length = `${config.prefix}${c}`.length;
        }
        const quote = message.content.substring(prefix_length).trim();
        if (quotes_data.includes(quote)) {
            // remove quote from array.
            quotes_data = quotes_data.filter(q => q !== quote);
            message.channel.send(`Deleting ...\n${quote}`)
                .then(log_sended_message)
                .catch(console.error);
        } else {
            // add quote to array.
            quotes_data.push(quote);
            message.channel.send(`Saving ...\n${quote}`)
                .then(log_sended_message)
                .catch(console.error);
        }
        save_quotes();
    }
}

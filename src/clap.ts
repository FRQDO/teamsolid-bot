import { Message } from "discord.js";
import { config_object } from "./config.js";


const command = "clap";
export const clap_help =
    `${config_object.data.prefix}${command} - claps the replyed message`;


export function clap(message: Message): void {
    if (
        message.type === "REPLY" &&
        message.reference?.messageId &&
        message.content.trim() === `${config_object.data.prefix}${command}`
    ) {
        let refID: string = message.reference?.messageId;
        message.channel.messages.fetch(refID).then(replyed_message => {
            let toclap = replyed_message.content;
            let clapped: string = "";

            if (/\s/g.test(toclap)) {
                clapped = toclap.replace(/\s+/g, "👏")
            } else {
                for (let i = 0; i < toclap.length; i++) {
                    // increase by one because 👏 are two UTF-16 code units
                    // current character is 👏
                    if (toclap.charCodeAt(i) === 55357 && toclap.charCodeAt(i + 1) === 56399) {
                        clapped += toclap[i];
                        clapped += toclap[i + 1];
                        i += 1;
                    }
                    // next character is 👏
                    else if (toclap.charCodeAt(i + 1) === 55357 && toclap.charCodeAt(i + 2) === 56399) {
                        clapped += toclap[i];
                    }
                    else {
                        clapped += toclap[i];
                        clapped += "👏";
                    }
                }
            }
            if (toclap.charCodeAt(0) != 55357 || toclap.charCodeAt(1) != 56399) {
                clapped = "👏" + clapped;
            }
            if (toclap.charCodeAt(toclap.length - 2) != 55357 || toclap.charCodeAt(toclap.length - 1) != 56399) {
                clapped += "👏";
            }

            message.channel.send(clapped);
        })
    }
}

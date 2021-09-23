import { Message } from "discord.js";
import { config_object } from "./config.js";


const command = "mock";
export const olid_help =
    `${config_object.data.prefix}${command} - Mocks the replyed message`;


export function mock(message: Message): void {
    // console.log(message);
    if (
        message.type === "REPLY" &&
        message.reference?.messageId &&
        message.content.trim() === `${config_object.data.prefix}${command}`
    ) {
        let refID: string = message.reference?.messageId;
        message.channel.messages.fetch(refID).then(replyed_message => {
            // console.log(message.content);
            let toMock = replyed_message.content;
            let mocked: string = "";
            for (let i = 0; i < toMock.length; i++) {
                if (i % 2 === 0) {
                    mocked += toMock[i].toLowerCase();
                } else {
                    mocked += toMock[i].toUpperCase();
                }
            }
            message.channel.send(mocked);
        })
    }
}

import { Message } from "discord.js";
import { config_object } from "./config.js";


const command = "mock";
export const mock_help =
    `${config_object.data.prefix}${command} - Mocks the replyed message`;


export function mock(message: Message): void {
    if (
        message.type === "REPLY" &&
        message.reference?.messageId &&
        message.content.trim() === `${config_object.data.prefix}${command}`
    ) {
        let refID: string = message.reference?.messageId;
        message.channel.messages.fetch(refID).then(replyed_message => {
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

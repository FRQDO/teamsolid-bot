import { Message } from "discord.js";


export function good_bot_bad_bot(message: Message): void {
    if (message.content.toLocaleLowerCase().includes("good bot")
        || message.content.toLocaleLowerCase().includes("guter bot")
    ) {
        message.react("🤗")
            .then(() => console.log("Reacting: 🤗"))
            .catch(console.error);
    }
    if (message.content.toLocaleLowerCase().includes("bad bot")
        || message.content.toLocaleLowerCase().includes("böser bot")
    ) {
        message.react("😭")
            .then(() => console.log("Reacting: 😭"))
            .catch(console.error);
    }
}
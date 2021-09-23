import Discord from "discord.js";
import { Intents } from "discord.js";
import { config_object } from "./config.js";
import { good_bot_bad_bot } from "./good_bot_bad_bot.js";
import { help } from "./help.js";
import { log_received_message } from "./log.js";
import { markov } from "./markov.js";
import { olid } from "./olid.js";
import { quotes } from "./quotes.js";
import { yes_no } from "./yes_no.js";
import { TwitchStreams } from "./twitch.js";


export const client = new Discord.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
});

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on("ready", () => {
    console.log(`${config_object.data.bot_name} is ready.`);
    void TwitchStreams.factory(client).catch(
        (e) => {
            console.error("[ERROR]", (<Error>e).message);
            process.exit(1);
        }
    );
});

// Create an event listener for messages
client.on("messageCreate", message => {
    log_received_message(message);
    help(message);
    olid(message);
    good_bot_bad_bot(message);
    quotes(message);
    yes_no(message);
    markov(message);
});

client.login(config_object.data.token)
    .then(() => console.log("Logging in ..."))
    .catch(console.error);

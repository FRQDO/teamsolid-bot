import { ApiClient } from "@twurple/api";
import { HelixUser, HelixStream } from "@twurple/api";
import { ClientCredentialsAuthProvider } from "@twurple/auth";
import Discord, { TextChannel, Message } from "discord.js";

import { config_object } from "./config.js";

export interface ITwitchConfig {
    client_id: string;
    client_secret: string;
    streams: string[];
    update_interval: number;
    channel_id: string;
    command: string;
    c: string;
}


const twitch_config = config_object.data.twitch as ITwitchConfig;


const CLIENT_ID = twitch_config.client_id;
const CLIENT_SECRET = twitch_config.client_secret;
const UPDATE_INTERVAL = twitch_config.update_interval;
//const USER_NAMES = twitch_config.streams;
const CHANNEL_ID = twitch_config.channel_id;
const PREFIX = config_object.data.prefix;
const COMMAND = twitch_config.command;
const C = twitch_config.c;

const authProvider = new ClientCredentialsAuthProvider(CLIENT_ID, CLIENT_SECRET);
const apiClient = new ApiClient({
    authProvider: authProvider,
    // logger: {
    //     minLevel: 'debug'
    // }
});


export class TwitchStreams {
    users = new Map<string, { helixUser: HelixUser, helixStream?: HelixStream }>();
    client: Discord.Client;
    CLIENT_ID: string;

    private constructor(client: Discord.Client) {
        this.client = client;
        if (twitch_config.client_id === undefined) {
            throw new Error("x");
        } else {
            this.CLIENT_ID = twitch_config.client_id;
        }
    }

    static async factory(client: Discord.Client): Promise<TwitchStreams> {
        const twitchStreams: TwitchStreams = new TwitchStreams(client);

        const helixUsers = await apiClient.users.getUsersByNames(twitch_config.streams);
        for (const user of helixUsers) {
            twitchStreams.users.set(user.displayName, { helixUser: user });
        }
        await twitchStreams.initStreams();
        setInterval(() => void twitchStreams.update(), UPDATE_INTERVAL);
        client.on("messageCreate", message => {
            twitchStreams.command(message);
        });
        return twitchStreams;
    }

    async initStreams(): Promise<void> {
        const streams = await this.getStreams();
        for (const stream of streams) {
            const userObject = this.users.get(stream.userDisplayName);
            if (userObject !== undefined) {
                userObject.helixStream = stream;
            }
        }
    }

    getUserIdArray(): string[] {
        return Array.from(this.users).map(([, value]) => value.helixUser.id);
    }

    async getStreams(): Promise<HelixStream[]> {
        const streamsPaginated = await apiClient.streams.getStreams({ userId: this.getUserIdArray() });
        // Missing handling pagination
        return streamsPaginated.data;
    }

    async update(): Promise<void> {
        try {
            console.log("Updating streams ...");
            const streams = await this.getStreams();
            for (const [user, userObject] of this.users) {
                let stream: HelixStream | undefined;
                for (const s of streams) {
                    if (user === s.userDisplayName) {
                        stream = s;
                        break;
                    }
                }
                if (userObject.helixStream === undefined && stream !== undefined) {
                    // new stream
                    userObject.helixStream = stream;
                    console.log(`${user} startet streaming.`);
                    void this.send_live_notification(userObject.helixStream);
                } else if (userObject.helixStream !== undefined && stream === undefined) {
                    // stream went offline
                    userObject.helixStream = undefined;
                    console.log(`${user} went offline.`);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    log(): void {
        for (const [user, userObject] of this.users) {
            console.log(`Stream: ${user}`);
            if (userObject.helixStream !== undefined) {
                console.log(`Title: ${userObject.helixStream.title}\n` +
                    `Starttime: ${userObject.helixStream.startDate.toTimeString()}\n` +
                    `Viewers: ${userObject.helixStream.viewers}\n`);
            }
        }
    }

    get_channel(): TextChannel | undefined {
        return this.client.channels.cache.get(CHANNEL_ID) as TextChannel | undefined;
    }

    async send_live_notification(stream: HelixStream): Promise<void> {
        const thumbnail = stream.thumbnailUrl.replace("{width}", "480").replace("{height}", "270");
        const title = `${stream.userDisplayName} started streaming.`;
        const url = `https://twitch.tv/${stream.userDisplayName}`;
        const category: string | undefined = (await stream.getGame())?.name;
        const embed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle(title)
            .setURL(url)
            .setDescription(`${stream.title}`)
            .setImage(thumbnail);
        if (category != undefined) {
            embed.setFooter(category);
        }
        void this.get_channel()?.send({ embeds: [embed] });
    }

    help(): void {
        console.log("help todo");
    }

    async add_stream(stream: string): Promise<void> {
        console.log(`Adding stream: ${stream}`);
        const helixUser = await apiClient.users.getUserByName(stream);
        const helixStream = await apiClient.streams.getStreamByUserName(stream);
        if (helixUser !== null && helixStream !== null) {
            this.users.set(stream, {
                helixUser: helixUser,
                helixStream: helixStream,
            });
            config_object.save();
        } else {
            console.log("could not find add stream error todo");
        }
    }

    remove_stream(stream: string): void {
        console.log(`Removing stream: ${stream}`);
        this.users.delete(stream);
        twitch_config.streams = twitch_config.streams.filter(e => e !== stream);
        console.log("save config todo");
    }

    command(message: Message): void {
        const trimed_content = message.content.trim();
        if (trimed_content.startsWith(`${PREFIX}${COMMAND}`) || trimed_content.startsWith(`${PREFIX}${C}`)) {
            const content_array = trimed_content.split(" ");
            if (content_array.length !== 2) {
                console.log(content_array);
                this.help();
            } else {
                const new_stream = content_array[1];
                if (twitch_config.streams.includes(new_stream)) {
                    this.remove_stream(new_stream);
                } else {
                    void this.add_stream(new_stream);
                }
            }
        }
    }
}

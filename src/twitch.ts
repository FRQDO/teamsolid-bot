import { ApiClient } from "twitch";
import { HelixUser, HelixStream } from "twitch";
import { ClientCredentialsAuthProvider } from "twitch-auth";
import Discord, { TextChannel } from 'discord.js';

import { config } from './config.js';


const client_id = config.twitch.client_id;
const client_secret = config.twitch.client_secret;
const update_interval = config.twitch.update_interval;
const userNames = config.twitch.streams;


const authProvider = new ClientCredentialsAuthProvider(client_id, client_secret);
const apiClient = new ApiClient({ authProvider: authProvider });


class TwitchStreams {
    users = new Map<string, { helixUser: HelixUser, stream?: HelixStream }>();
    client: Discord.Client;

    constructor(client: Discord.Client) {
        this.client = client;
    }

    async init(userNames: string[]) {
        const helixUsers = await apiClient.helix.users.getUsersByNames(userNames);
        for (const user of helixUsers) {
            this.users.set(user.displayName, { helixUser: user });
        }
    }

    async initStreams() {
        const streams = await this.getStreams();
        for (const stream of streams) {
            const userObject = this.users.get(stream.userDisplayName);
            if (userObject !== undefined) {
                userObject.stream = stream;
            }
        }
    }

    getUserIdArray(): string[] {
        return Array.from(this.users).map(([_, value]) => value.helixUser.id);
    }

    async getStreams() {
        const streamsPaginated = await apiClient.helix.streams.getStreams({ userId: this.getUserIdArray() });
        // Missing handling pagination
        return streamsPaginated.data;
    }

    async update() {
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
            if (userObject.stream === undefined && stream !== undefined) {
                // new stream
                userObject.stream = stream;
                console.log(`${user} startet streaming.`);
                this.send_live_notification(userObject.stream);
            } else if (userObject.stream !== undefined && stream === undefined) {
                // stream went offline
                userObject.stream = undefined;
                console.log(`${user} went offline.`);
            }
        }
    }

    log() {
        for (const [user, userObject] of this.users) {
            console.log(`Stream: ${user}`);
            if (userObject.stream !== undefined) {
                console.log(`Title: ${userObject.stream.title}\n` +
                    `Starttime: ${userObject.stream.startDate.toTimeString()}\n` +
                    `Viewers: ${userObject.stream.viewers}\n`);
            }
        }
    }

    get_channel(): TextChannel | undefined {
        const channel_id = "431445289790865412";
        return this.client.channels.cache.get(channel_id) as TextChannel | undefined;
    }

    async send_live_notification(stream: HelixStream) {
        const thumbnail = stream.thumbnailUrl.replace("{width}", "480").replace("{height}", "270");
        const title = `${stream.userDisplayName} started streaming.`;
        const url = `https://twitch.tv/${stream.userDisplayName}`;
        let category: string | undefined = (await stream.getGame())?.name;
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(title)
            .setURL(url)
            .setDescription(`${stream.title}`)
            .setImage(thumbnail)
            .setFooter(category);
        this.get_channel()?.send(embed);
    }
}

export async function twitch(client: Discord.Client) {
    const twitchStreams = new TwitchStreams(client);
    await twitchStreams.init(userNames);
    await twitchStreams.initStreams();
    setInterval(_ => { void twitchStreams.update(); }, update_interval);
}

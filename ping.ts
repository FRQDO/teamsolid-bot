import { Client, Message, Intents } from 'https://raw.githubusercontent.com/harmony-org/harmony/main/mod.ts';

import { TOKEN } from './config.ts';
import { INTENTS } from './config.ts';

const client = new Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`);
})

client.on('messageCreate', (msg: Message) => {
    if (msg.content === '!ping') {
        console.log('Command Used: Ping');
        msg.reply('pong!');
    }
})

console.log('harmony - ping example');
console.log(TOKEN.length);

client.connect(TOKEN, INTENTS);


import { Command, Member, CommandContext, Embed } from 'https://raw.githubusercontent.com/harmony-org/harmony/main/mod.ts'

export default class UserinfoCommand extends Command {
    name = "userinfo"
    guildOnly = true
    aliases = [ 'u', 'user' ]

    async execute(ctx: CommandContext): Promise<void> {
        const member: Member = ctx.message.member as any
        const roles = await member.roles.array()
        const embed = new Embed()
        .setTitle(`User Info`)
        .setAuthor({ name: member.user.tag })
        .addField("ID", member.id)
        .addField("Roles", roles.map(r => r.name).join(", "))
        .addField('Permissions', JSON.stringify(member.permissions.has('ADMINISTRATOR')))
        .setColor(0xff00ff)
        ctx.channel.send(embed)
    }
}
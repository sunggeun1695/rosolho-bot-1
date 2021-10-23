const { Client, Collection, MessageEmbed } = require('discord.js');
const fs = require('fs')
const client = new Client({ intents: ["GUILDS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "GUILD_PRESENCES", "GUILD_VOICE_STATES", "GUILD_WEBHOOKS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING"] });

client.commands = new Collection();
client.slashcommands = new Collection();
client.aliases = new Collection();
client.money = require('./models/MoneySchema');
client.fetch = require('node-fetch');
const User = require('./models/PremiumSchema');
const { createCmd } = require('./dataHandler');
const config = require('./config');
client.message = (message) => {  }

module.exports = client;

process.on('unhandledRejection', () => {
    console.log('크래쉬가 발생했어요... 제가 죽을뻔했지만, 크래쉬 방지 핸들러가 살렸어요.')
})

client.on('messageCreate', async message => {
    client.message(message);
});

fs.readdirSync('./commands/').forEach(dir => {
    fs.readdir(`./commands/${dir}`, (err, files) => {
        if (err) throw err;

        var jsFiles = files.filter(f => f.split(".").pop() === "js")

        if(jsFiles.length <= 0) return console.log("=231-2-32=")

        jsFiles.forEach(file => {
            var fileGet = require(`./commands/${dir}/${file}`);
            console.log(`커맨드 ${file} is loaded`)

            try {
                client.commands.set(fileGet.help.name, fileGet)
                fileGet.help.aliases.forEach(alias => {
                    client.aliases.set(alias, fileGet.help.name)
                })
            } catch (err) {
                return console.log(err);
            }
        })
    })
})

fs.readdirSync('./slashcommands/').forEach(dir => {
    fs.readdir(`./slashcommands/${dir}`, (err, files) => {
        if (err) throw err;

        var jsFiles = files.filter(f => f.split(".").pop() === "js");
        if (jsFiles.length <= 0) return console.log('=251-9-35=');

        jsFiles.forEach(file => {
            var fileGet = require(`./slashcommands/${dir}/${file}`);
            console.log(`빗금 명령어 ${file} 이(가) 로드되었습니다.`)

            try {
                client.slashcommands.set(fileGet.help.name, fileGet);
            } catch (err) {
                return console.log(err);
            }
        })
    })
})

client.on('interactionCreate', async inter => {
    let slashCmds = client.slashcommands.get(inter.commandName)
    if(slashCmds) slashCmds.run(client, inter)
})
.on('ready', async () => {
    console.log(`${client.user.tag} 으(로) 로그인 하였습니다.`)

    createCmd(client);
})
.on('messageCreate', async message => {
    if(message.author.bot) return;

    let prefix = config.prefix;
    let data = User.findOne({ User: message.author.id });
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1)
    message.data = { args: args, cmd: cmd }

    module.exports.arg = args;

    let commands = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));    
    if(commands) {
        if(!message.member.permissions.has("SEND_MESSAGES")) return message.channel.send('..? 메시지 보내기 권한이 없는데 어떻게 보내셨죠..?');
        if(!message.content.startsWith(prefix)) return;
        if(!commands.help.premium) {
            
        } else if(commands.help.premium === true && !data) {
            return message.channel.send('해당 명령어는 프리미엄 전용 명령어입니다.');
        }
        if(!commands.help.devOnly) {

        } else if(commands.help.devOnly === true && (message.author.id !== '813634627800530984')) {
            return message.channel.send('이 명령어는 로쏠호봇 개발자 전용 명령어입니다.')
        }
        commands.run(client, message, args, prefix);
    }
})

require('./mongo')();
client.login(config.token);

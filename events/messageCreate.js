const client = require('../index')
const Schema = require('../config');
const User = require('../models/PremiumSchema');
const ms = require('ms');


client.on('messageCreate', async message => {
    if(message.author.bot) return;

    let prefix;
    let data = User.findOne({ User: message.author.id });
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1)

    prefix = Schema.prefix
    message.data = { args: args, cmd: cmd }

    let commands = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));    
    if(commands) {
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
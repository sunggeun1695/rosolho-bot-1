const { Message } = require('discord.js')

/**
 * 
 * @param {*} client 
 * @param {Message} message 
 * @param {String[]} args 
 * @returns 
 */
module.exports.run = async (client, message, args) => {
    if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send('이 명령어를 사용하려면 **채널 관리하기** 권한이 필요해요.');
    if(message.guild.channels.cache.has("로쏠호봇-공지")) return message.channel.send('이미 공지채널이 있습니다.');
    message.guild.channels.create('로쏠호봇-공지', {
        permissionOverwrites: [
            {
                id: message.guild.roles.everyone,
                deny: ["SEND_MESSAGES"]
            }
        ],
        type: "GUILD_TEXT"
    }).then(async msg => {
        msg.send(`${message.author} 이제부터 공지가 올라올 경우 이 채널에 올라오게 됩니다.\n만약 마음이 바뀌어서 공지를 안받고 싶다면, 이 채널을 그냥 삭제해 주세요.`);
    })
}

module.exports.help = {
    name: "announce-channel",
    aliases: ["공지채널"],
    category: "관리자"
}
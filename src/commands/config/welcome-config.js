const { Message, MessageActionRow } = require('discord.js');
const Model = require('../../models/memberSchema');

/**
 * 
 * @param {*} client 
 * @param {Message} message 
 * @param {String[]} args 
 * @returns 
 */
module.exports.run = async (client, message, args) => {
    let option = args[0];
    if(!option) return message.channel.send('설정할 옵션을 입력하세요. (메시지, 채널, 역할, 켜기, 끄기)');
    let data = Model.findOne({ guildId: message.guild.id });

    if(option.toLowerCase() === "메시지") {
        let msg = args.slice(1).join(" ");
        if(!msg) return message.channel.send('환영메시지를 적어주세요. (멘션: {member.mention}, 이름: {member.user.username}, 태그: {member.user.tag})');

        if(!Model.findOne({ guildId: message.guild.id })) Model.create({$set: { guildId: message.guild.id, welcomeMessage: msg }});

        let yus = msg
        .split('{member.mention}').join("<@!" + message.author.id + ">")
        .split('{member.user.username}').join(message.author.username)
        .split('{member.user.tag}').join(message.author.tag);

        await Model.updateOne({$set: { welcomeMessage: msg }}).then(() => {
            return message.channel.send(`환영 메시지가 설정되었습니다.\n미리보기: ${yus}`)
        })
    } else if(option.toLowerCase() === "채널") {
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
        if(!channel) return message.channel.send('채널을 멘션해 주세요.');

        if(!Model.findOne({ guildId: message.guild.id })) Model.create({$set: { guildId: message.guild.id, welcomeChannelId: channel.id }});
        await Model.updateOne({$set: { welcomeChannelId: channel.id }}).then(() => {
            return message.channel.send(`환영채널이 <#${channel.id}> 으(로) 설정되었습니다.`)
        })
    } else if(option.toLowerCase() === "역할") {
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
        if(!role) return message.channel.send('역할의 ID 또는 멘션해 주세요.');

        if(!Model.findOne({ guildId: message.guild.id })) Model.create({$set: { guildId: message.guild.id, welcomeRole: role.id }});

        await Model.updateOne({$set: { welcomeRole: role.id }}).then(() => {
            return message.channel.send(`자동역할이 **${role.name}** 으(로) 설정되었습니다.`)
        })
    } else if(option.toLowerCase() === "켜기") {
        if(data.welcomeChannel === null) return message.channel.send('먼저, 환영채널을 설정해 주세요.');
        if(data.welcomeControl === true) return message.channel.send('이미 환영설정이 켜져 있습니다.');
        
        await Model.updateOne({$set: { welcomeControl: true }}).then(() => {
            return message.channel.send('환영설정이 켜졌습니다.')
        })
    } else if(option.toLowerCase() === "끄기") {
        if(data.welcomeControl === false) return message.channel.send('이미 환영설정이 꺼져 있습니다.');
        
        await Model.updateOne({$set: { welcomeControl: false }}).then(() => {
            return message.channel.send('환영설정이 꺼졌습니다.')
        })
    }
}

module.exports.help = {
    name: "welcome-config",
    aliases: ["환영설정"],
    permission: '서버 관리하기'
}
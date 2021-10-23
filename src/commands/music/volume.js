const music = require('@koenie06/discord.js-music');
const { MessageAttachment, Message } = require('discord.js');
const model = require('../../models/PremiumSchema')

/**
 * 
 * @param {*} client 
 * @param {Message} message 
 * @param {*} args 
 * @returns 
 */
module.exports.run = async (client, message) => {
    if(message.channel.type === "DM") return message.author.send('이 명령어는 DM 에서 사용할 수 없어요.')

    let img = new MessageAttachment('https://cdn.discordapp.com/attachments/891205058941845576/897814976968949830/unknown.png', '예시.png')

    message.channel.send('현재 어떠한 이유로 볼륨 설정을 하면 오류가 납니다. 볼륨설정을 하려면 아래에 이미지 대로 따라하세요.\n(로쏠호봇 우클릭 -> 사용자 볼륨 조정)');
    message.channel.send({ files: [img] })
}

module.exports.help = {
    name: "volume",
    aliases: ["볼륨"],
    premium: true
}
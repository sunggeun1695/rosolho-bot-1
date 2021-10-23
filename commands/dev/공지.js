const Discord = require('discord.js');
let channel = "로쏠호봇-공지";

/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {String[]} args 
 */
module.exports.run = async (client, message, args) => {
    let msginf = args.join(" ");
    if(!msginf) return message.channel.send('공지 내용을 입력하세요.');
    message.channel.send('공지 전송중...').then(async msg => {
        const embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle('공지')
        .setDescription(`${msginf}`)
        .setFooter(`${message.author.tag} - 인증됨`, message.author.displayAvatarURL({ dynamic: true }))

        client.guilds.cache.forEach(guild => {
            for(let i in channel) {
                const gchannel = guild.channels.cache.find(
                    val => (
                        val.name.toLowerCase() === channel && val instanceof Discord.TextChannel
                    )
                )

                if(gchannel instanceof Discord.TextChannel) {
                    gchannel.topic
                } else return;
            }
        })

        msg.edit('공지가 모든 서버에 보내졌습니다.')
    })
}

module.exports.help = {
    name: "공지",
    aliases: [],
    devOnly: true
}
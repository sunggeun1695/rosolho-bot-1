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
        .setTimestamp()

        client.guilds.cache.forEach(guild => {
            for(let i in channel) {
                const gchannel = guild.channels.cache.find(
                    val => (
                        val.name.includes(channel[i]) && val instanceof Discord.TextChannel
                    )
                )

                if(gchannel instanceof Discord.TextChannel) {
                    gchannel.send({ embeds: [embed] })
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
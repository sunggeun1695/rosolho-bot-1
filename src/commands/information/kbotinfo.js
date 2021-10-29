const { Message, Client, MessageEmbed } = require('discord.js');
let fetch = require('node-fetch');

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 */
module.exports.run = async (client, message, args) => {
    let botname = client.users.cache.get(args[0]) || client.users.cache.find(x => x.username === args.join(" "));
    if(!botname) return message.channel.send('봇을 찾을 수 없거나, 봇의 이름을 입력하지 않았습니다.');
    const bot = await fetch(`https://koreanbots.dev/api/v2/bots/${botname.id}`).then(res => res.json());

    if(!botname.bot) return message.channel.send('봇입니다.');

    let formated = bot.data.status
    .split("online").join("온라인")
    .split("dnd").join("다른 용무중")
    .split("invisible").join("오프라인")
    .split("idle").join("자리 비움")

    const embed = new MessageEmbed()
    .setColor("BLUE")
    .setTitle(`${bot.data.name} - 봇 정보`)
    .setThumbnail(`https://cdn.discordapp.com/avatars/${botname.id}/${bot.data.avatar}.webp?size=80`)
    .addField('디스코드 서버', `${bot.data.discord ? `https://discord.gg/${bot.data.discord}` : "없음"}`)
    .addField('접두사', `**${bot.data.prefix}**`)
    .addField('상태', `**${formated}**`)
    .addField('서버 수', `**${bot.data.servers ? bot.data.servers : "0"}개**`)
    .addField('초대하기', `${bot.data.url}`)
    .addField('설명', `**${bot.data.intro}**`)
    .addField('라이브러리', `**${bot.data.lib}**`)
    .addField('카테고리', `**${bot.data.category}**`)
    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }));
    message.channel.send({ embeds: [embed] })
}

module.exports.help = {
    name: "kbotinfo",
    aliases: ["봇정보", "한국디스코드봇정보", "디스코드봇정보"]
}
const music = require('@koenie06/discord.js-music');

module.exports.run = async (client, message, args) =>  {
    if(message.channel.type === "DM") return message.author.send('이 명령어는 DM 에서 사용할 수 없어요.')

    let data = model.findOne({
        userId: message.author.id
    })
    if(!data) return message.channel.send('음악 명령어를 사용하려면 프리미엄 이여야 합니다.');

    const isConnected = await music.isConnected({
        interaction: message
    });
    if(!isConnected) return message.channel.send('현재 재생중인 음악이 없습니다.');

    const queue = await music.getQueue({
        interaction: message
    });

    let respone = ``;

    for (let i = 0; i < queue.length; i++) {
        respone += `${i + 1}. [${queue[i].info.title}](${queue[i].info.url}) - ${queue[i].info.duration}\n`
    }

    message.channel.send(`${respone}`)
}

module.exports.help = {
    name: "queue",
    aliases: ["getQueue", "재생목록", "큐"],
    premium: true
}
const music = require('@koenie06/discord.js-music');

module.exports.run = async (client, message, args) =>  {
    if(message.channel.type === "DM") return message.author.send('이 명령어는 DM 에서 사용할 수 없어요.')

    const isConnected = await music.isConnected({
        interaction: message
    });
    if(!isConnected) return message.channel.send('현재 재생중인 음악이 없습니다.');

    music.skip({
        interaction: message
    });

    message.channel.send('⏮ 음악을 스킵 하였습니다.')
}

module.exports.help = {
    name: "skip",
    aliases: ["스킵", "건너뛰기"],
    premium: true
}
const music = require('@koenie06/discord.js-music');
const model = require('../../models/PremiumSchema')

module.exports.run = async (client, message, args) =>  {
    if(message.channel.type === "DM") return message.author.send('이 명령어는 DM 에서 사용할 수 없어요.')

    const isConnected = await music.isConnected({
        interaction: message
    });
    if(!isConnected) return message.channel.send('재생중인 음악이 없습니다.');

    const isResumed = music.isResumed({
        interaction: message
    });
    if(isResumed) return message.channel.send('이미 음악이 정상적으로 재생중입니다.');

    music.resume({
        interaction: message
    });

    message.channel.send('🔊 음악을 다시 시작 했습니다.')
}

module.exports.help = {
    name: "resume",
    aliases: ["재개", "다시시작", "음악다시시작", "ㄱㄷ녀ㅡㄷ"],
    premium: true
}
const music = require('@koenie06/discord.js-music');
const model = require('../../models/PremiumSchema')

module.exports.run = async (client, message, args) =>  {
    if(message.channel.type === "DM") return message.author.send('이 명령어는 DM 에서 사용할 수 없어요.')

    const isConnected = await music.isConnected({
        interaction: message
    });
    if(!isConnected) return message.channel.send('재생중인 음악이 없습니다.');

    const queue = music.getQueue({
        interaction: message
    });
    if(queue.length === 0) return message.channel.send('음악이 현재 일시정지 되어 있으므로 정지할 수 없습니다.');

    music.stop({
        interaction: message
    })

    message.channel.send('🚫 음악을 아예 정지하였습니다.')
}

module.exports.help = {
    name: "stop",
    aliases: ["정지", "스탑", "멈춰", "꺼져", "나가", "스톱", "ㄴ새ㅔ"],
    premium: true
}
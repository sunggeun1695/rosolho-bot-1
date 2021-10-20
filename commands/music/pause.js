const music = require('@koenie06/discord.js-music');

module.exports.run = async (client, message, args) =>  {
    if(message.channel.type === "DM") return message.author.send('이 명령어는 DM 에서 사용할 수 없어요.')

    const isConnected = await music.isConnected({
        interaction: message
    });
    if (!isConnected) return message.channel.send('현재 재생중인 음악이 없습니다.')

    const isPaused = music.isPaused({
        interaction: message
    });
    if(isPaused) return message.channel.send('이미 음악이 멈춰 있습니다.');

    music.pause({
        interaction: message
    });

    message.channel.send('⛔ 음악이 일시정지 되었습니다. `!!재개` 로 다시 시작하실 수 있습니다.');
}

module.exports.help = {
    name: "pause",
    aliases: ["일시정지", "ㅇㅅㅈㅈ"],
    premium: true
}
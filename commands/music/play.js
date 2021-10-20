const music = require('@koenie06/discord.js-music');
const model = require('../../models/PremiumSchema')

module.exports.run = async (client, message) => {
    if(message.channel.type === "DM") return message.author.send('이 명령어는 DM 에서 사용할 수 없어요.')
    const song = message.data.args.join(" ");
    if(!song) return message.channel.send('재생하실 음악의 링크 또는 이름을 입력해주세요.');

    const voicechannel = message.member.voice.channel;
    if(!voicechannel) return message.channel.send('음성채널에 먼저 접속하세요.');

    music.play({
        interaction: message,
        channel: voicechannel,
        song: song
    })
    message.channel.send('음악을 재생합니다.');
}

module.exports.help = {
    name: "play",
    aliases: ["재생", "플레이"],
    premium: true
}
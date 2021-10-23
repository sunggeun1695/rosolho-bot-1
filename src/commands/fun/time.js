const moment = require('moment-timezone');
moment.locale('ko-KR');

module.exports.run = async (client, message, args) => {
    message.channel.send(`현재 시간: ${moment(new Date()).tz('Asia/Seoul').format('YYYY년 MM월 DD일 dd요일 HH시 mm분 ss분')}`);
}

module.exports.help = {
    name: "time",
    aliases: ["시간", "시계"]
}
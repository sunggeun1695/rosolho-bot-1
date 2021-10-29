const moment = require('moment-timezone');
moment.locale('ko-KR');

module.exports = (args) => {
    moment(args).tz(args).format('YYYY년 MM월 DD일 dd요일 HH시 mm분')
};
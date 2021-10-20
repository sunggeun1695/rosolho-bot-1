const client = require('../index');
const moment = require('moment-timezone');

const blacklist = []

const welcomeChannelId = 893045422141112353

client.on('guildMemberAdd', async (member) => {
    let condition1 = moment.duration(moment(new Date()).locale('ko').diff(moment(member.user.createdTimestamp).locale('ko'))).asMinutes() < 30;
    let condition2 = member.user.defaultAvatarURL == member.user.displayAvatarURL();
    let condition3 = member.user.username.indexOf('로쏠호') != -1; // 닉네임에 로쏠호가 들어간다면 차단.
    if (condition1) member.ban();
    if (condition1 && condition2) member.ban();

    if (condition3) member.ban();

    const guild = member.guild
    const newUser = member.user

    const welcomeChannel = guild.channels.cache.find((channel) => channel.id === welcomeChannelId)

    welcomeChannel.send(`<@!${newUser.id}> 님 어서오세요.`);

    for (var i of blacklist) {
        let user = member.guild.members.cache.find(x => x.id === i)
        if (user) {
            guild.channels.cache.get('899209919012671519').send(`${user.tag} 님은 블랙리스트에 있으므로, 자동으로 차단됩니다.`);
            user.ban({ reason: "User is Blacklist Added." });
        }
    }
})
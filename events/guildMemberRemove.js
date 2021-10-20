const client = require("../index");

client.on('guildMemberRemove', async member => {
    if(member.guild.id !== '893045421528727614') return;
    if(member.roles.cache.has("Muted")) {
        member.ban({ reason: "뮤트먹은 상태로 퇴장" });
        member.send('당신은 팀 로쏠호에서 뮤트먹은 상태로 퇴장하므로 차단당했습니다.');
        client.guilds.cache.get('893045421528727614').channels.cache.get('899209919012671519').send(`${member.user.tag} 님은 뮤트먹은 상태로 퇴장하므로, 차단당했습니다.`);
    }

    member.guild.channels.cache.get('893045422141112353').send(`${member.user.tag} 님 안녕히가세요.`);
})
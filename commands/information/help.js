const { stripIndents } = require('common-tags');
const { MessageEmbed, Client, Message, MessageActionRow, MessageButton } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 * @param {*} prefix 
 */
module.exports.run = async (client, message, args, prefix) => {
    const embed = new MessageEmbed()
    .setColor("GREEN")
    .setTitle('로쏠호봇 명령어 리스트')
    .setDescription(stripIndents`
    👤 관리 명령어
    \`!!차단\` - 유저를 차단합니다.
    \`!!추방\` - 대상을 추방합니다.
    \`!!청소\` - 메시지를 청소합니다.
    \`!!슬로우모드\` - 메시지가 전송된 채널에 슬로우 모드를 겁니다.
    \`!!차단해제\` - 대상의 차단을 해제합니다.
    \`!!경고\` - 유저에게 경고를 합니다.
    \`!!경고삭제\` - 유저의 경고를 삭제합니다.
    \`!!공지채널\` - 로쏠호봇의 공지를 수신할 채널을 하나 만듭니다.
    \`!!티켓\` - 티켓에 대한 설정을 합니다.

    👾 기본 명령어
    \`!!날씨\` - 입력한 지역의 날씨를 확인합니다.
    \`!!핑\` - 봇의 핑을 확인합니다.
    \`!!쿠폰\` - 프리미엄을 적용합니다.
    \`!!유저정보\` - 유저의 정보를 확인합니다.
    \`!!한강\` - 한강온도, 시간을 알 수 있습니다.
    \`!!유튜브\` - 유튜브를 디스코드로 시청할 수 있습니다.
    \`!!깃허브\` - 해당 유저의 깃허브 정보를 확인합니다.
    \`!!계산기\` - 계산기를 소환합니다.
    \`!!시간\` - 현재 시간을 확인합니다.

    🎯 이코노미 명령어
    \`!!통장생성\` - 통장을 생성합니다.
    \`!!돈받기\` - 돈을 받습니다.
    \`!!돈\` - 돈을 확인합니다.
    
    🎧 음악 명령어 (프리미엄 전용)
    \`!!일시정지\` - 음악을 잠깐 멈춥니다.
    \`!!재생\` - 음악을 재생합니다.
    \`!!재생목록\` - 재생목록을 확인합니다.
    \`!!재개\` - 일시정지된 음악을 다시 시작합니다.
    \`!!스킵\` - 재생목록에 추가된 음악을 스킵합니다. (현재 재생중인 곡 기준)
    \`!!정지\` - 음악을 아예 정지합니다.
    \`!!볼륨\` - 설명 없음
    `)
    .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, format: "jpg" }));

    const gh = new MessageEmbed()
    .setColor("BLUE")
    .setTitle('깃허브')
    .setDescription('로쏠호봇 오픈소스 코드를 2차 창작 후 배포하지 마세요.\nhttps://github.com/team-rosolho/rosolho-bot')
    .setFooter('로쏠호봇 - Team Rosolho')

    const button = new MessageActionRow().addComponents(
        new MessageButton().setStyle("LINK").setURL('https://discord.gg/ZUbNTUx6E2').setLabel('로쏠호봇 서포트 서버')
    )

    message.channel.send({ content: "명령어 리스트에요.", embeds: [embed, gh], components: [button] })
}

module.exports.help = {
    name: "help",
    aliases: ["도움", "도움말", "헬프", "h", "ㅗ", "ㅗ디ㅔ"],
    usage: "!!도움말 <명령어 이름>",
    description: "도움 명령어입니다."
}
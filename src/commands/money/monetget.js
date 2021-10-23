const discord = require('discord.js');
const Canvas = require('canvas');

/**
 * 
 * @param {discord.Client} client 
 * @param {discord.Message} message 
 * @param {String[]} args 
 */
module.exports.run = async (client, message, args) => {
    let add = Math.floor(Math.random() * 3000) + 1;
    let data = await client.money.findOne({
        UserId: message.author.id
    })
    if(!data) client.money.create({ UserId: message.author.id, Money: add });
    else {
        client.money.findOneAndUpdate({
            UserId: message.author.id
        }, {
            Money: data.Money+add
        });
        message.channel.send(`${add}원을 받았습니다!`)
    }
}

module.exports.help = {
    name: "moneyget",
    aliases: ["work", "돈받기", "돈빋기"],
    cooldown: 180
}
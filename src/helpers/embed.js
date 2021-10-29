const { Message } = require('discord.js');

/**
 * 
 * @param {Message} message 
 * @param {String[]} args 
 * @returns 
 */
module.exports = (message, args) => {
    let embed = new (require('discord.js')).MessageEmbed()
    .setColor(args)
    .setTitle(args)
    .setDescription(args)
    .setFooter(args);
    return message.channel.send({ embeds: [embed] });
}
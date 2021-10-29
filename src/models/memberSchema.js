const mongoose = require('mongoose');

const model = new mongoose.Schema({
    guildId: String,
    welcomeControl: { type: Boolean, default: false },
    welcomeMessage: String,
    welcomeChannelId: String,
    welcomeRole: String,
    leaveMessage: String,
    leaveChannelId: String,
    leaveControl: { type: String, default: false }
})

module.exports = mongoose.model('member', model);
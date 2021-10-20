const mongoose = require('mongoose');

const reqS = {
    type: String,
    required: true
}

const profileSchema = new mongoose.Schema({
    guildId: reqS,
    userId: reqS,
    warns: {
        type: Number,
        default: 0
    },
})

module.exports = mongoose.model('profiles', profileSchema);
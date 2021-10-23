const mongoose = require('mongoose');

const Model = new mongoose.Schema({
    userId: String,
    cooldown: Number,
    commandName: String
})

module.exports = mongoose.model('cooldown', Model);
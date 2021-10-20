const client = require('../index')
const User = require('../models/PremiumSchema');
client.on('interactionCreate', async inter => {
    let slashCmds = client.slashcommands.get(inter.commandName)
    if(slashCmds) slashCmds.run(client, inter)
})
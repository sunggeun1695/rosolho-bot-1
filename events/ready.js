const client = require('../index')
const { createCmd } = require('../dataHandler')
client.on('ready', async () => {
    console.log(`${client.user.tag} 으(로) 로그인 하였습니다.`)

    createCmd(client);
})
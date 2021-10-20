const { ShardingManager } = require('discord.js');
const config = require('./config');
const manager = new ShardingManager('./index.js', {
    token: config.token,
    respawn: true
});

manager.spawn(2);
manager.on('shardCreate', async shard => {
    console.log(`${shard.id}번 샤드를 실행하였습니다.`);
});
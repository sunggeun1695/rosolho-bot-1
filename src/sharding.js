const { ShardingManager } = require('discord.js');
const config = require('./client');
const manager = new ShardingManager('./src/index.js', { token: config.token, respawn: true });

manager.spawn(2);

manager.on('shardCreate', async shard => {
    console.log(`${shard.id} Sharded Created.`);
});
const LetsChat = require('../');

const client = new LetsChat.Client({
    url: 'https://devchat.dmrail.games/',
    token: 'no-token-4-u',
});

client.once('ready', () => {
    console.log('ready!');
    console.log(client.rooms);
});

client.on('message_create', msg => {
    // console.log(require('util').inspect(msg));
    if (msg.text === 'd!ping') msg.room.send('Pong!');
});
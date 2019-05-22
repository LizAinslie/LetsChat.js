const LetsChat = require('../');

const client = new LetsChat.Client(require('./config'));

client.once('ready', () => {
	console.log('ready!');
	console.log(client.rooms);
});

client.on('message_create', msg => {
	// console.log(require('util').inspect(msg));
	if (msg.text === 'd!ping') msg.room.send('Pong!');
});
const Room = require('./Room');
const User = require('./User');

const uploadsRegex = /^upload:\/\/files\/[0-9a-f]{24}\/.+$/gi;

/**
 * An internal class that represents a Let's Chat message
 */
class Message {
	/**
	 * Create a new message object
	 * @param {Object} data The room data to initialise the message object with
	 * @param {string} data.id The message ID
	 * @param {string} data.text The message content
	 * @param {string|Room|Object} data.room The room the message was sent in
	 * @param {string|User|Object} data.owner The user who sent the message
	 * @param {Date|string} data.created The timestamp of the room's creation
	 * @param {Client} client The client that the message belongs to
	 */
	constructor(data, client) {
		/**
		 * The client that the message belongs to
		 * @type {Client}
		 */
		this.client = client;
		
		/**
		 * The id of the message
		 * @type {string}
		 */
		this.id = data.id;
		
		/**
		 * The content of the message
		 * @type {string}
		 */
		this.text = data.text;
		
		/**
		 * The timestamp of the message's creation
		 * @type {Date}
		 */
		this.createdAt = new Date(data.posted);
		
		/**
		 * The room the message belongs to
		 * @type {Room}
		 */
		this.room = null;
		
		if (typeof data.room === 'string') this.client.rest.methods.getRoom(data.room).then(room => {
			this.room = new Room(room, this.client);
		});
		else if (data.room instanceof Room) this.room = data.room;
		else this.room = new Room(data.room, this.client);
		
		/**
		 * The owner of the room
		 * @type {User}
		 */
		this.owner = null;
		
		if (typeof data.owner === 'string') this.client.rest.methods.getUser(data.owner).then(user => {
			this.owner = new User(user, this.client);
		});
		else if (data.owner instanceof User) this.owner = data.owner;
		else this.owner = new User(data.owner, this.client);
		
		// /**
		//  * A file attached to the message;
		//  */
		// this.attachment = null;
		
		// if (uploadsRegex.test(this.text)) {
		// 	this.client.rest.methods.getFiles(this.room.id).then(files => {
				
		// 	});
		// }
	}
	
	/**
	 * Reply to the creator of the message, via a mention.
	 * @param {string} text The text to reply to the user with
	 * 
	 * @example
	 * client.on('message_create', msg => {
	 *     if (msg.text in badWords) { // badWords is an array defined elsewhere.
	 *         msg.reply('you may not say that word here!'); // sends '@user, you may not say that word here!'
	 *     }
	 * });
	 */
	reply(text) {
		this.room.send(`@${this.owner.username}, ${text}`);
	}
}

module.exports = Message;

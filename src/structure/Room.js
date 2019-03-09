const User = require('./User');

/**
 * An internal class that represents a Let's Chat room
 */
class Room {
	/**
	 * Create a new room object
	 * @param {Object} data The room data to initialise the room object with
	 * @param {string} data.id The room ID
	 * @param {string} data.slug The room slug
	 * @param {string} data.name The name of the room
	 * @param {string} data.description The room's description
	 * @param {Date|string} data.created The timestamp of the room's creation
	 * @param {Client} client The client that the room belongs to
	 */
	constructor(data, client) {
		/**
		 * The client that the room belongs to
		 * @type {Client}
		 */
		this.client = client;
		
		/**
		 * The id of the room
		 * @type {string}
		 */
		this.id = data.id;
		
		/**
		 * The room slug
		 * @type {string}
		 */
		this.slug = data.slug;
		
		/**
		 * The name of the room
		 * @type {string}
		 */
		this.name = data.name;
		
		/**
		 * The room's description
		 * @type {string}
		 */
		this.description = data.description === '' ? null : data.description;
		
		/**
		 * The timestamp of the room's creation
		 * @type {Date}
		 */
		this.createdAt = new Date(data.created);
	}
	
	/**
	 * The room's owner
	 * @type {User}
	 */
	get owner() {
		this.client.rest.methods.getUser(this.ownerId).then(user => {
			return new User(user, this.client);
		});
	}
	
	/**
	 * Send a message to the room
	 * @param {string} text The text to send
	 * @returns {Promise<void>}
	 */
	send(text) {
		return new Promise((resolve, reject) => {
			try {
				this.client.io.emit('messages:create', {
					room: this.id,
					text,
				});
				resolve();
			} catch (e) {
				reject(e);
			}
		});
	}
}

module.exports = Room;
const socketio = require('socket.io-client');
const EventEmitter = require('events');
const { sanitizeUrl } = require('@braintree/sanitize-url');

const User = require('../structure/User');
const Room = require('../structure/Room');
const Message = require('../structure/Message');
const Collection = require('../structure/Collection');

const RestManager = require('./rest/RestManager');

/**
 * The starting point for any bot.
 * @extends {EventEmitter}
 */
class Client extends EventEmitter {
	/**
	 * Create a new Let's Chat client.
	 * @param {Object} options The options to bootstrap the client with
	 * @param {string} [options.url='http://localhost:5000/'] The base URL of the Let's Chat instance
	 * @param {string} options.token The token to authenticate the bot with
	 */
	constructor(options) {
		super();
		/**
		 * The base URL of the Let's Chat instance
		 * @type {string}
		 */
		this.baseUrl = options.url ? sanitizeUrl(options.url) : 'http://localhost:5000/';
		
		/**
		 * The API token to authenticate the API with. **THIS SHOULD BE KEPT SECRET _AT ALL TIMES!_**
		 * @type {string}
		 */
		this.token = options.token;
		
		/**
		 * The Socket.IO instance the bot uses to connect to Let's Chat
		 * @private
		 */
		this.io = socketio.connect(`${this.baseUrl}?token=${this.token}`, {
			reconnect: true
		});
		
		/**
		 * Rooms the bot is in
		 * @type {Map<Room>}
		 */
		this.rooms = new Collection();
		
		/**
		 * The clients rest api connector
		 * @type {RestManager}
		 */
		this.rest = new RestManager(this);
		
		this.events();
	}
	
	events() {
		this.io.on('connect', () => {
			this.rest.methods.getRooms().then(rooms => {
				for (const room of rooms) this.io.emit('rooms:join', room.id, connectedRoom => {
					this.rooms.set(room.id, new Room(room));
				});

				this.emit('ready');
			});
		});

		this.io.on('messages:new', msg => {
			const message = new Message(msg, this);

			this.emit('message_create', message);
		});

		this.io.on('rooms:new', room => {
			room = new Room(room, this);

			this.io.emit('rooms:join', room.id, connectedRoom => {
				this.rooms.set(room.id, room);

				this.emit('room_create', room);
			});
		});

		this.io.on('rooms:update', room => {
			const newRoom = new Room(room, this);
			const oldRoom = this.rooms.get(room.id);
			
			this.rooms.set(room.id, newRoom);

			this.emit('room_update', newRoom, oldRoom);
		});
	}
}

module.exports = Client;
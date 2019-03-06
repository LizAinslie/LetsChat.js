const socketio = require('socket.io-client');
const EventEmitter = require('events');
const { sanitizeUrl } = require('@braintree/sanitize-url');

/**
 * The starting point for any bot.
 * @extends {EventEmitter}
 */
class Client extends EventEmitter {
	/**
	 * Create a new Let's Chat client.
	 * @param {Object} options The options to bootstrap the client with
	 * @param {string} [options.url='http://localhost:5000/'] The base URL of the Let's Chat instance
	 */
	constructor(options) {
		/**
		 * THe base URL of the Let's Chat instance
		 * @type {string}
		 */
		this.baseUrl = options.url ? sanitizeUrl(options.url) : 'http://localhost:5000/';

		this._handleEvents();
		
		/**
		 * Rooms the bot is in
		 * @type {Room[]}
		 */
		this.rooms = [];
	}

	/**
	 * Sets up socket.io event handlers
	 * @private
	 */
	_handleEvents() {
		this.io.on();
	}

	/**
	 * Log into Let's Chat with the bot's token
	 * @param {string} token The token of the user to log in with
	 * @returns {Promise<Client>}
	 */
	connect(token) {
		return new Promise((resolve, reject) => {
			try {
				this.token = token;
				this.io = socketio.connect(`${this.baseUrl}?token=${encodeURIComponent(token)}`, {
					reconnect: true
				});

				resolve(this);
			} catch(err) {
				reject(err);
			}
		});
	}
}

module.exports = Client;
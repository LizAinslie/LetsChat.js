const { sanitizeUrl } = require('@braintree/sanitize-url');
const snekfetch = require('snekfetch');

/**
 * The API wrapper to make API calls from
 */
class API {
	/**
	 * Create a new Let's Chat API binding.
	 * @param {Object} options The options to bootstrap the client with
	 * @param {string} [options.url='http://localhost:5000/'] The base URL of the Let's Chat instance
	 * @param {string} options.token The token to authenticate the API with
	 */
    constructor(options) {
        this.baseUrl = `${options.url ? sanitizeUrl(options.url) : 'http://localhost:5000/'}?token=${options.token}`;
    }
}
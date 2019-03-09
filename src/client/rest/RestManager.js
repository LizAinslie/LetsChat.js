const RestMethods = require('./RestMethods');

const snekfetch = require('snekfetch');

/**
 * A REST manager for the Let's Chat API
 */
class RestManager {
    /**
     * Create a new REST manager
     * @param {Client} client The client to use with the REST manager
     */
    constructor(client) {
        /**
         * The client that the REST manager belongs to.
         * @type {Client}
         */
        this.client = client;
        
        /**
         * The methods that can be used to interact with the API
         * @type {RestMethods}
         */
        this.methods = new RestMethods(this);
    }
    
    /**
     * Make a request to the Let's Chat API
     * @param {string} type The type of request to make. One of: `GET`
     * @param {string} path The API path to make the request to
     */
    makeRequest(type, path) {
        return new Promise((resolve, reject) => {
            switch(type.toLowerCase()) {
                case 'get':
                    snekfetch.get(`${this.client.baseUrl}${path}`, {
                        headers: {
                            Authorization: `bearer ${this.client.token}`,
                        },
                    })
                    .then(res => resolve(res.body))
                    .catch(reject);
            }
        });
    }
}

module.exports = RestManager;

/**
 * An internal class that represents a Let's Chat user
 */
class User {
    /**
     * Create a new user object
     * @param {Object} data The user data to initialise the user object with
     * @param {string} data.id The room ID
     * @param {string} data.firstName The user's first name
     * @param {string} data.lastName The user's last name
     * @param {string} data.avatar The hash of the user's email, used for fetching an avatar from Gravatar
     * @param {string} data.username The user's username
     * @param {string} data.displayName The user's display name
     * @param {Client} client The client that the user belongs to
     */
	constructor(data, client) {
		/**
		 * The client that the user belongs to
		 * @type {Client}
		 */
		this.client = client;
		
		/**
		 * The ID of the user
		 * @type {string}
		 */
		this.id = data.id;
		
		/**
		 * The MD5 hash of the user's email, used with gravatar to retrieve an avatar image
		 * @type {string}
		 */
		this.avatarHash = data.avatar;
		
		/**
		 * The user's first name
		 * @type {string}
		 */
		this.firstName = data.firstName;
		
		/**
		 * The user's last name
		 * @type {string}
		 */
		this.lastName = data.lastName;
		
		/**
		 * The user's username
		 * @type {string}
		 */
		this.username = data.username;
		
		/**
		 * The user's display name
		 * @type {string}
		 */
		this.displayName = data.displayName;
	}
	
	/**
	 * The URL of the user's avatar image
	 * @type {string}
	 */
	get avatarUrl() {
		return `https://www.gravatar.com/avatar/${this.avatarHash}`;
	}
	
	/**
	 * The user's full name
	 * @type {string}
	 */
	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}
}

module.exports = User;
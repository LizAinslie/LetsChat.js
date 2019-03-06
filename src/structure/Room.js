/**
 * An internal class that represents a room
 */
class Room {
    /**
     * Create a new room object
     * @param {Object} data The room data to initialise the room object with
     * @param {string} data.id The room ID
     * @param {string} data.slug The room ID
     * @param {string} data.name The room ID
     * @param {string} data.description The room ID
     * @param {Date|string} data.created The room ID
     */
    constructor(data) {
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
}

module.exports = Room;
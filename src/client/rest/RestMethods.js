class RestMethods {
	constructor(manager) {
		this.rest = manager;
	}
    
	getUser(id) {
		return this.rest.makeRequest('get', `users/${id}`);
	}
    
	getRooms(limit = null, skip = null) {
		let rooms = this.rest.makeRequest('get', 'rooms');
        
		if (skip !== null) rooms = rooms.slice(skip, rooms.length);
		if (limit !== null) rooms = rooms.slice(0, limit);
        
		return rooms;
	}
    
	getRoom(id) {
		return this.rest.makeRequest('get', `rooms/${id}`);
	}
    
	getFiles(roomId) {
		return this.rest.makeRequest('get', `rooms/${roomId}/files`);
	}
}

module.exports = RestMethods;

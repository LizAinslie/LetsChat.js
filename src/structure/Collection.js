/**
 * An extension of {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map|Map} with some extras
 */
class Collection extends Map {
	/**
     * Create a new collection
     * @param iterable An iterable element to initialise the collection with.
     */
	constructor(iterable) {
		super(iterable);
	}
    
	/**
     * The first element of the collection
     * @type {*}
     */
	get first() {
		return Array.from(this.values())[0];
	}
    
	/**
     * Searches for a single item where its specified property's value is identical to the given value
     * (`item[prop] === value`), or the given function returns a truthy value. In the latter case, this is identical to
     * [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find).
     * <warn>All collections used in LetsChat.js are mapped using their `id` property, and if you want to find by id you
     * should use the `get` method. See
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) for details.</warn>
     * @param {string|Function} propOrFn The property to test against, or the function to test with
     * @param {*} [value] The expected value - only applicable and required if using a property for the first argument
     * @returns {*}
     * @example
     * collection.find('username', 'Bob');
     * @example
     * collection.find(val => val.username === 'Bob');
     */
	find(propOrFn, value) {
		if (typeof propOrFn === 'string') {
			if (typeof value === 'undefined') throw new Error('Value must be specified.');
			for (const item of this.values()) if (item[propOrFn] === value) return item;
			return null;
		} else if (typeof propOrFn === 'function') {
			for (const [key, val] of this) if (propOrFn(val, key, this)) return val;
			return null;
		} else throw new TypeError('First argument must be a property string or a function.');
	}
}

module.exports = Collection;

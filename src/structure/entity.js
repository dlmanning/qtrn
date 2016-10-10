const { objectEntries } = require('../helpers')

class Entity {
  /**
   * @param {string} id
   * @param {string} type
   * @param {Object} [properties]
   */
  constructor (id, type, properties) {
    if (id == null || typeof id !== 'string') {
      throw new TypeError('Expected value passed for \'id\' to be a string')
    }

    this.id = id

    if (type == null || typeof type !== 'string') {
      throw new TypeError('Expected value passed for \'type\' to be a string')
    }

    this.type = type

    if (properties != null && Object(properties) !== properties) {
      throw new TypeError('If provided, the value passed for \'properties\' must be an object')
    }

    this.properties = properties == null
      ? new Map()
      : new Map(objectEntries(properties))

  }

  getProperties () {
    const properties = {}

    for (let [key, value] of this.properties) {
      properties[key] = value
    }

    return properties
  }

  /**
   * @param {string} key
   */
  getProperty (key) {
    return this.properties.get(key)
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  setProperty (key, value) {
    this.properties.set(key, value)

    return this
  }
}

module.exports = Entity

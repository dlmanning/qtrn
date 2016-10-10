const { objectEntries } = require('../helpers')

class Entity {
  /**
   * @param {Graph} graph
   * @param {string} type
   * @param {Object} [properties]
   */
  constructor (graph, type, properties) {
    if (!(graph instanceof Graph)) {
      throw new TypeError('Expected value passed for \'graph\' to be an instance of a Graph')
    }

    this.graph = graph

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

const Graph = require('./graph')

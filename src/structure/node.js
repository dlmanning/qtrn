const { flatMapArrays, objectValues } = require('../helpers')
const Entity = require('./entity')

class Node extends Entity {
  constructor (graph, type, properties) {
    super(graph, type, properties)

    this._incomingRelationships = {}
    this._outgoingRelationships = {}
  }

  getIncomingRelationships (type) {
    if (type != null && typeof type !== 'string') {
      throw new TypeError('Expected \'type\' to be a string')
    }

    return (type
      ? (this._incomingRelationships[type] || []).slice()
      : flatMapArrays(objectValues(this._incomingRelationships))
    )
  }

  getOutgoingRelationships (type) {
    if (type != null && typeof type !== 'string') {
      throw new TypeError('Expected \'type\' to be a string')
    }

    return (type
      ? (this._outgoingRelationships[type] || []).slice()
      : flatMapArrays(objectValues(this._outgoingRelationships))
    )
  }

  getOutgoingNodes (type) {
    return this.getOutgoingRelationships(type).map(r => r.end)
  }

  getIncomingNodes (type) {
    return this.getIncomingRelationships(type).map(r => r.start)
  }

  addOutgoingRelationship (type, relationship) {
    if (type != null && typeof type !== 'string') {
      throw new TypeError('Expected \'type\' to be a string')
    }

    addRelationship(this._outgoingRelationships, type, relationship)
  }

  addIncomingRelationship (type, relationship) {
    if (type != null && typeof type !== 'string') {
      throw new TypeError('Expected \'type\' to be a string')
    }

    addRelationship(this._incomingRelationships, type, relationship)
  }
}

function addRelationship (map, type, relationship) {
  if (map[type] == null) {
    map[type] = []
  }

  map[type].push(relationship)
}

module.exports = Node

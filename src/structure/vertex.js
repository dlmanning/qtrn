const Entity = require('./entity')

/**
 * @extends Entity
 */
class Node extends Entity {
  constructor (id, type, properties) {
    super(id, type, properties)

    this.relationships = {
      incoming: {},
      outgoing: {}
    }
  }

  addOutgoingRelationship (type, node) {
    addRelationship(this.relationships.outgoing, type, node)
  }

  addIncomingRelationship (type, node) {
    addRelationship(this.relationships.incoming, type, node)
  }
}

function addRelationship (map, type, node) {
  if (map[type] == null) {
    map[type] = []
  }

  map[type].push(node)
}

module.exports = Node

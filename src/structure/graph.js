const Node = require('./vertex')
const Relationship = require('./relationship')

class Graph {
  constructor () {
    this.nodeIndex = new Map()
    this.nodeTypesRegistry = new Map()

    this.relationshipIndex = new Map()
    this.relationshipTypesRegistry = new Map()
  }

  /**
   * @param {string} id
   * @return {Node}
   */
  getNodeById (id) {
    return this.nodeIndex.get(id)
  }

  /**
   * @param {string} type
   * @return {[Node]}
   */
  getNodesByType (type) {
    const nodes = this.nodeTypesRegistry.get(type)
    
    if (nodes instanceof Set) {
      return [...nodes]
    }

    return []
  }

  createNode (id, type, properties) {
    if (this.nodeIndex.has(id)) {
      throw new Error()
    }

    if (!this.nodeTypesRegistry.has(type)) {
      this.nodeTypesRegistry.set(type, new Set())
    }

    const node = new Node(id, type, properties)

    this.nodeIndex.set(id, node)
    this.nodeTypesRegistry.get(type).add(node)

    return id
  }

  hasNodeWithId (id) {
    return this.nodeIndex.has(id)
  }

  createRelationship (type, start, end, properties) {
    if (typeof type !== 'string') {
      throw new TypeError()
    }

    const startNode = this.nodeIndex.get(start)
    const endNode = this.nodeIndex.get(end)

    if (startNode == null || endNode == null) {
      throw new Error()
    }

    const id = startNode.id + type + endNode.id

    if (this.relationshipIndex.has(id)) {
      throw new Error()
    }

    startNode.addOutgoingRelationship(type, endNode)
    endNode.addIncomingRelationship(type, startNode)

    const relationship = new Relationship(id, type, startNode, endNode, properties)

    if (!this.relationshipTypesRegistry.has(type)) {
      this.relationshipTypesRegistry.set(type, new Set())
    }

    this.relationshipIndex.set(id, relationship)
    this.relationshipTypesRegistry.get(type).add(relationship)

    return id
  }

  hasRelationshipWithId (id) {
    return this.relationshipIndex.has(id)
  }
}

module.exports = Graph

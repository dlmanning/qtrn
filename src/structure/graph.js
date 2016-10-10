const { NodeTraversal } = require('../traversal')

class Graph {
  constructor () {
    this.nodeIndex = new Map()
    this.nodeToIndexMap = new WeakMap()
    this.nodeTypesRegistry = new Map()

    this.relationshipIndex = new Map()
    this.relationshipToIndexMap = new WeakMap()
    this.relationshipTypesRegistry = new Map()

    this._indexCounter = 0;
  }

  N (type) {
    if (type != null) {
      if (typeof type !== 'string') {
        throw new TypeError('Expected \'type\' to be a string')
      }

      const nodes = this.nodeTypesRegistry.get(type)
    
      if (nodes instanceof Set) {
        return new NodeTraversal(nodes)
      }

      return new NodeTraversal([])
    }

    return new NodeTraversal(this.nodeIndex.values())
  }

  find (cb) {
    for (let node of this.nodeIndex.values()) {
      if (cb(node.getProperties()) === true) return node
    }

    return undefined
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
      return Array.from(nodes)
    }

    return []
  }

  getIdForNode (node) {
    const id = this.nodeToIndexMap.get(node)

    if (typeof id !== 'number') {
      throw new Error('Passed node is unknown to graph')
    }

    return id
  }

  getIdForRelationship (relationship) {
    const id = this.relationshipToIndexMap.get(relationship)

    if (typeof id !== 'number') {
      throw new Error('Passed relationship is unknown to graph')
    }

    return id
  }

  createNode (type, properties) {
    if (!this.nodeTypesRegistry.has(type)) {
      this.nodeTypesRegistry.set(type, new Set())
    }

    const node = new Node(this, type, properties)
    const id = getNextIndex(this)
  
    this.nodeIndex.set(id, node)
    this.nodeToIndexMap.set(node, id)
    this.nodeTypesRegistry.get(type).add(node)

    return node
  }

  createRelationship (type, start, end, properties) {
    if (typeof type !== 'string') {
      throw new TypeError('Expected \'type\' to be a string')
    }

    if (!(start instanceof Node && end instanceof Node)) {
      throw new TypeError(`Expected \'start\' and \'end\' to be Nodes`)
    }

    if (!this.nodeToIndexMap.has(start) || !this.nodeToIndexMap.has(end)) {
      throw new Error('Start and end nodes must belong to the graph')
    }

    const id = getNextIndex(this)

    const relationship = new Relationship(this, type, start, end, properties)

    start.addOutgoingRelationship(type, relationship)
    end.addIncomingRelationship(type, relationship)

    if (!this.relationshipTypesRegistry.has(type)) {
      this.relationshipTypesRegistry.set(type, new Set())
    }

    this.relationshipIndex.set(id, relationship)
    this.relationshipToIndexMap.set(relationship, id)
    this.relationshipTypesRegistry.get(type).add(relationship)

    return relationship
  }
}

function getNextIndex (graph) {
  const index = graph._indexCounter
  graph._indexCounter += 1

  return index
}

module.exports = Graph

const Node = require('./node')
const Relationship = require('./relationship')

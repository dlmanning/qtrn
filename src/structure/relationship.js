const Entity = require('./entity')

class Relationship extends Entity {
  constructor (graph, type, start, end, properties) {
    if (!(start instanceof Node)) {
      throw new TypeError('Expected value passed for \'start\' to be a Node')
    }

    if (!(end instanceof Node)) {
      throw new TypeError('Expected value passed for \'end\' to be a Node')
    }

    super(graph, type, properties)

    this.start = start
    this.end = end
  }
}

module.exports = Relationship

const Node = require('./node')

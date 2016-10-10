const Entity = require('./entity')
const Node = require('./vertex')

class Relationship extends Entity {
  constructor (id, type, start, end, properties) {
    if (!(start instanceof Node)) {
      throw new TypeError('Expected value passed for \'start\' to be a Node')
    }

    if (!(end instanceof Node)) {
      throw new TypeError('Expected value passed for \'end\' to be a Node')
    }

    super(id, type, properties)

    this.start = start
    this.end = end
  }
}

module.exports = Relationship

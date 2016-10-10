class Traversal {
  constructor (S) {
    this._s = Array.from(S)
  }

  hasNot (key, value) {
    const E = filter(this._s, element => {
      const propValue = element.getProperty(key)

      return (
        propValue == null ||
        (value != null && propValue !== value)
      )
    })

    return new this.constructor(E)
  }

  has (key, value) {
    const E = filter(this._s, element => {
      const propValue = element.getProperty(key)

      return (
        propValue != null &&
        (value == null || propValue === value)
      )
    })

    return new this.constructor(E)
  }

  values () {
    return Array.from(this._s)
  }
}

class NodeTraversal extends Traversal {
  constructor (S) {
    super(S)
  }

  in (type) {
    const E = reduce(this._s, (accum, element) => {
      accum.push(...element.getIncomingNodes(type))
      return accum
    })

    return new NodeTraversal(E)
  }

  out (type) {
    const E = reduce(this._s, (accum, element) => {
      accum.push(...element.getOutgoingNodes(type))
      return accum
    })

    return new NodeTraversal(E)  
  }

  inR (type) {
    const E = reduce(this._s, (accum, element) => {
      accum.push(...element.getIncomingRelationships(type))
      return accum
    })

    return new RelationshipTraversal(E)
  }

  outR (type) {
    const E = reduce(this._s, (accum, element) => {
      accum.push(...element.getOutgoingRelationships(type))
      return accum
    })

    return new RelationshipTraversal(E)
  }
}

class RelationshipTraversal extends Traversal {
  constructor (S) {
    super(S)
  }
}

module.exports = {
  NodeTraversal,
  RelationshipTraversal
}

function filter (arr, predicate) {
  return reduce(arr, filterLambda)

  function filterLambda (output, item) {
    if (predicate(item)) output.push(item)
    return output
  }
}

function map (arr, lambda) {
  return reduce(arr, mapLambda)

  function mapLambda (output, item) {
    output.push(lambda(item))
    return output
  }
}

function reduce (arr, lambda) {
  let output = []

  for (let i = 0; i < arr.length; i++) {
    output = lambda(output, arr[i])
  }

  return output
}

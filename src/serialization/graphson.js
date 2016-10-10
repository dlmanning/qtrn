module.exports = function writeGraphSON (graph) {
  const nodes = graph.N().values().map(node => serializeNode(graph, node))

  return JSON.stringify(nodes)
}

function serializeNode (graph, node) {
  const outR = node.getOutgoingRelationships().reduce((accum, relationship) => {
    if (accum[relationship.type] == null) {
      accum[relationship.type] = []
    }

    accum[relationship.type].push({
      id: graph.getIdForRelationship(relationship),
      outN: graph.getIdForNode(relationship.end),
      properties: relationship.getProperties()
    })

    return accum
  }, {})

  const inR = node.getIncomingRelationships().reduce((accum, relationship) => {
    if (accum[relationship.type] == null) {
      accum[relationship.type] = []
    }

    accum[relationship.type].push({
      id: graph.getIdForRelationship(relationship),
      inN: graph.getIdForNode(relationship.start),
      properties: relationship.getProperties()
    })

    return accum
  }, {})

  const output = {
    id: graph.getIdForNode(node),
    type: node.type,
    inR,
    outR,
    properties: node.getProperties()
  }

  return output
}

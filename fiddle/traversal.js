const tap = require('tap')
const { Graph, Relationship, Node, Entity } = require('../src/structure')
const writeGraphSON = require('../src/serialization/graphson')

tinker()

function tinker () {
  const db = new Graph()

  const marko = db.createNode('person', { name: 'marko', age: 29 })
  const vadas = db.createNode('person', { name: 'vadas', age: 27 })
  const lop = db.createNode('software', { name: 'lop', lang: 'java' })
  const josh = db.createNode('person', { name: 'josh', age: 32 })
  const ripple = db.createNode('software', { name: 'ripple', lang: 'java' })
  const peter = db.createNode('person', { name: 'peter', age: 35 })

  db.createRelationship('knows', marko, vadas, { weight: 0.5 })
  db.createRelationship('knows', marko, josh, { weight: 1.0 })
  db.createRelationship('created', marko, lop, { weight: 0.4 })
  db.createRelationship('created', josh, ripple, { weight: 1.0 })
  db.createRelationship('created', josh, lop, { weight: 0.4 })
  db.createRelationship('created', peter, lop, { weight: 0.2 })

  const queryResults = db.N('person').out('created').values()

  console.log(writeGraphSON(db))
}
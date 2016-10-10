const tap = require('tap')
const { Graph, Relationship, Node, Entity } = require('../src/structure')

tap.test('Entity', t => {
  const g = new Graph()

  const entity1 = new Entity(g, 'android')
  t.type(entity1, Entity, 'construct an entity')

  t.throws(() => new Entity(g, 1), 'throws if type is not a string')
  t.throws(() => new Entity(g, 'def', 'ghi'), 'throws if properties passed to constructor is not an object')

  const entity2 = new Entity(g, 'captain', { ship: 'enterprise' })

  t.equal(entity2.type, 'captain', 'set entity type')
  t.equal(entity2.getProperty('ship'), 'enterprise', 'get a property set in construction')

  entity2.setProperty('borgName', 'locutus')
  t.equal(entity2.getProperty('borgName'), 'locutus', 'get property set after construction')

  t.match(
    entity2.getProperties(),
    {
      ship: /enterprise/,
      borgName: /locutus/
    },
    'get all properties of the entity'
  )

  t.end()
})

tap.test('Node', t => {
  const g = new Graph()

  const node1 = new Node(g, 'tv show', { title: 'deadwood', status: 'cancelled' })
  t.type(node1, Node, 'construct a node')

  const node2 = new Node(g, 'Actor', { name: 'Keith Carradine', born: '1949-08-08T07:00:00.000Z' })

  node1.addOutgoingRelationship('actor', node2)
  t.ok(node1.getOutgoingRelationships('actor').includes(node2), 'set outgoing relationship')

  node2.addIncomingRelationship('actor', node1)
  t.ok(node2.getIncomingRelationships('actor').includes(node1), 'set incoming relationship')

  t.end()
})

tap.test('Graph', t => {
  const db = new Graph()
  t.type(db, Graph, 'construct a graph')

  const n1 = db.createNode('Author', { name: 'David', from: 'the East' })
  t.type(n1, Node, 'creates a new Node')

  const n2 = db.createNode('Company', { name: 'ZHealth', business: 'medicine' })

  const r1 = db.createRelationship('EMPLOYEED_BY', n1, n2, { since: '2015-06-01T07:00:00.000Z' })

  t.type(r1, Relationship, 'creates a new Relationship')

  t.throws(
    () => db.createRelationship(1, n2, n1),
    'throw if relationship type passed to createRelationship is not a string'
  )

  t.end()
})

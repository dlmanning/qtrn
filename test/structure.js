const tap = require('tap')
const { Graph, Relationship, Node, Entity } = require('../src/structure')

tap.test('Entity', t => {
  const entity1 = new Entity('data', 'android')
  t.type(entity1, Entity, 'construct an entity')

  t.throws(() => new Entity(1, 'abc'), 'throws if id is not a string')
  t.throws(() => new Entity('abc', 1), 'throws if type is not a string')
  t.throws(() => new Entity('abc', 'def', 'ghi'), 'throws if properties passed to constructor is not an object')

  const entity2 = new Entity('picard', 'captain', { ship: 'enterprise' })

  t.equal(entity2.id, 'picard', 'set entity id')
  t.equal(entity2.type, 'captain', 'set entity type')
  t.equal(entity2.getProperty('ship'), 'enterprise', 'get a property set in construction')

  entity2.setProperty('borgName', 'locutus')
  t.equal(entity2.getProperty('borgName'), 'locutus', 'get property set after construction')

  t.match(
    entity2.getProperties(),
    {
      ship: /^enterprise$/,
      borgName: /^locutus$/
    },
    'get all properties of the entity'
  )

  t.end()
})

tap.test('Node', t => {
  const node1 = new Node('deadwood', 'tv show', { status: 'cancelled' })
  t.type(node1, Node, 'construct a node')

  const node2 = new Node('Keith Carradine', 'Actor', { born: '1949-08-08T07:00:00.000Z' })

  node1.addOutgoingRelationship('actor', node2)
  t.ok(node1.relationships.outgoing['actor'].includes(node2), 'set outgoing relationship')

  node2.addIncomingRelationship('actor', node1)
  t.ok(node2.relationships.incoming['actor'].includes(node1), 'set incoming relationship')

  t.end()
})

tap.test('Graph', t => {
  const db = new Graph()
  t.type(db, Graph, 'construct a graph')

  const n1 = db.createNode('David', 'Author', { from: 'the East' })
  t.ok(db.hasNodeWithId(n1), 'add a node to the graph')

  t.throws(
    () => db.createNode('David', 'Author', { from: 'the East' }),
    'throw on attempt to add a duplicate id'
  )

  const n2 = db.createNode('ZHealth', 'Company', { business: 'medicine' })

  const r1 = db.createRelationship('EMPLOYEED_BY', n1, n2, { since: '2015-06-01T07:00:00.000Z' })

  t.ok(db.hasRelationshipWithId(r1), 'add a relationship to the graph')

  t.throws(
    () => db.createRelationship(1, n2, n1),
    'throw if relationship type passed to createRelationship is not a string'
  )

  t.end()
})

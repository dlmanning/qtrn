module.exports = Object.assign(
  {},
  require('./structure'),
  {
    writeGraphSON: require('./serialization/graphson')
  }
)

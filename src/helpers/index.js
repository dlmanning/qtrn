/**
 * @param {Object} obj
 */
function objectValues (obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key]
  })
}

/**
 * @param {Object} obj
 * @return {[string, *]}
 */
function objectEntries (obj) {
  return Object.keys(obj).map(function (key) {
    return [ key, obj[key] ]
  })
}

module.exports = {
  objectEntries,
  objectValues
}

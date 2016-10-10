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
 * @return {Array.<[string, *]>}
 */
function objectEntries (obj) {
  return Object.keys(obj).map(function (key) {
    return [ key, obj[key] ]
  })
}

function flatMapArrays (arr) {
  const output = []

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      output.push(arr[i][j])
    }
  }

  return output
}

module.exports = {
  objectEntries,
  objectValues,
  flatMapArrays
}

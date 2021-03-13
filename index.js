var mustache = require('mustache')

function formatKeys (keys) {
  return keys.join('\t')
}

function reducer (result, ast, context) {
  var first = ast[0]
  if (first === 'name' || first === '&' || first === '>') {
    result.push(formatKeys(context.concat(ast[1])))
  } else if (first === '#' || first === '^') {
    var childContext = context.concat(ast[1])
    result.push(formatKeys(childContext))
    ast[4].reduce(function (result, element) {
      return reducer(result, element, childContext)
    }, result)
  }
  return result
}

module.exports = function (template) {
  var prior = undefined
  return mustache.parse(template)
    .reduce(function (result, element) {
      return reducer(result, element, [])
    }, [])
    .sort()
    // Remove duplicates
    .reduce(function (result, element) {
      if (prior === undefined || prior !== element) {
        result.push(element)
      }
      prior = element
      return result
    }, [])
}

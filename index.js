var mustache = require('mustache')

module.exports = mustacheVars

function reducer(result, ast) {
  var first = ast[0]
  if (first === 'name' || first === '&' || first === '>') {
    result.push(ast[1]) }
  else if (first === '#' || first === '^') {
    result.push(ast[1])
    ast[4].reduce(reducer, result) }
  return result }

function mustacheVars(template) {
  var prior = undefined
  return mustache.parse(template)
    .reduce(reducer, [ ])
    .sort()
    // Remove duplicates
    .reduce(
      function(result, element) {
        if (prior === undefined || prior !== element ) {
          result.push(element) }
        prior = element
        return result },
      [ ])}

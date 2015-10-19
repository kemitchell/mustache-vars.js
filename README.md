# Command Line

```shellsession
$ mustache-vars <<< "{{B}} and {{A}}"
A
B
```

# JavaScript

```javascript
var vars = require('mustache-vars')
var assert = require('assert')

assert.deepEqual(vars('{{A}}'), [ 'A' ])

assert.deepEqual(vars('{{A}} and {{A}}'), [ 'A' ])

assert.deepEqual(vars('{{{A}}}'), [ 'A' ])

assert.deepEqual(vars('{{& A}}'), [ 'A' ])

assert.deepEqual(vars('{{> A}}'), [ 'A' ])

assert.deepEqual(vars('{{#A}}some text{{/A}}'), [ 'A' ])

assert.deepEqual(vars('{{#A}}some {{B}} text{{/A}}'), [ 'A', 'A\tB' ])

assert.deepEqual(vars('{{^A}}some {{B}} text{{/A}}'), [ 'A', 'A\tB' ])
```

# testdouble-nock

Support for [testdouble.js](https://github.com/testdouble/testdouble.js) for
users of [Nock](https://github.com/node-nock/nock)!

## Installation

```
$ npm i -D testdouble-nock
```

Then, from a test helper, invoke the module and pass in both `td` and `nock`, like so:

```js
global.td = require('testdouble')
global.nock = require('nock')
require('testdouble-nock')(td, nock)
```

For an example of a helper that sets up testdouble.js, testdouble-nock, and ensures td.reset() is called after each test, look at [test/helper.js](/test/helper.js) in this repo.

## Usage

When you invoke `testdouble-nock`, it adds a new top-level `td.api()` function that allows you to mock an external API by exposing common HTTP methods as mocked methods. Here's an example:

```JavaScript
describe('My API test', () => {
  it('should return a 200 for status', (done) => {
    const myApi = td.api('http://www.my-api.com')

    td.when(myApi.get('/status')).thenReturn('All good here!')

    request.get('http://www.my-api.com/status', (req, res, body) => {
      assert.equals(body, 'All good here!')

      done()
    })
  })
})
```

You can also verify that a call has taken place using `td.verify`:

```JavaScript
describe('My API test', () => {
  it('should return a 200 for status', (done) => {
    const myApi = td.api('http://www.my-api.com')

    request.get('http://www.my-api.com/status', (req, res, body) => {
      td.verify(myApi.get('/status'))

      done()
    })
  })
})
```

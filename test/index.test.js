const request = require('request')

module.exports = {
  'should support verify': (done) => {
    const api = td.api('https://example.com')

    request('https://example.com/api', () => {
      td.verify(api.get('/api'))

      done()
    })
  },
  'should support td.when': (done) => {
    const api = td.api('https://example.com')

    td.when(api.get('/api')).thenReturn('test')

    request('https://example.com/api', (err, res, body) => {
      assert.equal(body, 'test')

      done()
    })
  },
  'it should support two api instances': (done) => {
    const apiOne = td.api('https://example.com')
    const apiTwo = td.api('https://testdouble.com')

    td.when(apiOne.get('/api')).thenReturn('join')

    request('https://example.com/api', (err, res, body) => {
      request(`https://testdouble.com/${body}`, () => {
        td.verify(apiTwo.get('/join'))

        done()
      })
    })
  },
  'it should support verifying and mocking the same instance': (done) => {
    const api = td.api('https://example.com')

    td.when(api.get('/resources')).thenReturn('follow-up')

    request('https://example.com/resources', (err, res, body) => {
      request(`https://example.com/${body}`, () => {
        td.verify(api.get('/follow-up'))

        done()
      })
    })
  }
}
const request = require('request')

module.exports = {
  'should not verify an uncalled URL': (done) => {
    const api = td.api('https://example.com')

    request('https://example.com/api', () => {
      assert.throws(() => td.verify(api.get('/not-called')))

      done()
    })
  }
}

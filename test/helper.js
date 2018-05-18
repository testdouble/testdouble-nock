global.assert = require('assert')
global.nock = require('nock')
global.td = require('testdouble')

module.exports = {
  beforeAll: function () {
    require('../index')(td, nock)
  },
  beforeEach: function () {
    td.reset.onNextReset(() => nock.cleanAll())
  },
  afterEach: function () {
    td.reset()
  }
}

import 'mocha'
import * as chai from 'chai'
const expect = chai.expect
const module = require('./case-status-map')

describe('case-status-map', () => {
    
    it('should expose class', () => {
        expect(module).to.be.ok
    })
})
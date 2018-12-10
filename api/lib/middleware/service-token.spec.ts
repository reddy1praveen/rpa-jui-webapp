import 'mocha'
import * as chai from 'chai'
const expect = chai.expect
const module = require('./service-token')

describe('service-token', () => {
    
    it('should expose module', () => {
        expect(module).to.be.ok
    })
})
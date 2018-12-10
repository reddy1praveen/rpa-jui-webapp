import 'mocha'
import * as chai from 'chai'
const expect = chai.expect
const module = require('./request')

describe('request', () => {
    
    it('should expose module', () => {
        expect(module).to.be.ok
    })
})
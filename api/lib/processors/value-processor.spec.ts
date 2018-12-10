import 'mocha'
import * as chai from 'chai'
const expect = chai.expect
const module = require('./value-processor')

describe('value-processor', () => {
    
    it('should expose class', () => {
        expect(module).to.be.ok
    })
})
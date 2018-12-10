import 'mocha'
import * as chai from 'chai'
const expect = chai.expect
const module = require('./mockRequest')

describe('mockRequest', () => {
    
    it('should expose class', () => {
        expect(module).to.be.ok
    })
})
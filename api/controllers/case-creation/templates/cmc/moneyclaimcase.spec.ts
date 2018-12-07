import 'mocha'
import * as chai from 'chai'
const expect = chai.expect

describe('money claim case template spec', () => {
    const module = require('./moneyclaimcase.ts')
    
    it('should expose module', () => {
        expect(module).to.be.ok
    })

})
import 'mocha'
import * as chai from 'chai'
const expect = chai.expect

describe('financialremedy template spec', () => {
    const module = require('./financialremedy.ts')
    
    it('should expose module', () => {
        expect(module).to.be.ok
    })

})
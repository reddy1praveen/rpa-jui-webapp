import 'mocha'
import * as chai from 'chai'
const expect = chai.expect

describe('benefit template spec', () => {
    const module = require('./benefit.ts')
    
    it('should expose module', () => {
        expect(module).to.be.ok
    })

})
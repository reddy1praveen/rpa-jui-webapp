import 'mocha'
import * as chai from 'chai'
const expect = chai.expect

describe('grantofrepresentation template spec', () => {
    const module = require('./grantofrepresentation.ts')
    
    it('should expose module', () => {
        expect(module).to.be.ok
    })

})
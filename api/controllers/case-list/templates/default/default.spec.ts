import 'mocha'
import * as chai from 'chai'
const expect = chai.expect

describe('default template spec', () => {
    const module = require('./default.ts')
    
    it('should expose module', () => {
        expect(module).to.be.ok
    })

})
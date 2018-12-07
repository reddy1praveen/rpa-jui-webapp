import 'mocha'
import * as chai from 'chai'
const expect = chai.expect

describe('case templates spec', () => {
    const module = require('./index')
    
    it('should expose module', () => {
        expect(module).to.be.ok
    })

})
import 'mocha'
import * as chai from 'chai'
const expect = chai.expect

describe('divorce template spec', () => {
    const module = require('./divorce.ts')
    
    it('should expose module', () => {
        expect(module).to.be.ok
    })

})
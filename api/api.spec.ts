import 'mocha'
import * as chai from 'chai'
const expect = chai.expect

describe('api spec', () => {
    const module = require('./index')
    
    it('should expose router', () => {
        expect(module).to.be.ok
    })

})
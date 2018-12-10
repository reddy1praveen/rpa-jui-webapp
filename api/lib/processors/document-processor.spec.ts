import 'mocha'
import * as chai from 'chai'
const expect = chai.expect
const module = require('./document-processor')

describe('document-processor', () => {
    
    it('should expose class', () => {
        expect(module).to.be.ok
    })
})
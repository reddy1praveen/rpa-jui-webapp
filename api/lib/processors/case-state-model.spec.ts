import 'mocha'
import * as chai from 'chai'
const expect = chai.expect
import { processCaseState } from './case-state-model'

describe('case-state-model', () => {
    
    it('should expose processCaseState function', () => {
        expect(processCaseState).to.be.ok
    })
})
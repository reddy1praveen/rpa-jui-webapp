import 'mocha'
import * as chai from 'chai'
const expect = chai.expect
import { caseStateFilter, createCaseState, getDocId } from './case-state-util'

describe('case-state-util', () => {
    
    it('should expose caseStateFilter function', () => {
        expect(caseStateFilter).to.be.ok
    })
    
    it('should expose createCaseState function', () => {
        expect(createCaseState).to.be.ok
    })
    
    it('should expose getDocId function', () => {
        expect(getDocId).to.be.ok
    })
})
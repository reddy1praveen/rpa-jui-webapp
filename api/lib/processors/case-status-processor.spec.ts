import 'mocha'
import * as chai from 'chai'
const expect = chai.expect
import { caseStatusProcessor } from './case-status-processor'

describe('case-status-processor', () => {
    
    describe('caseStatusProcessor', () => {
        it('should return existing status if status null/false', () => {
            expect(caseStatusProcessor(null, {})).to.equal(null)
            expect(caseStatusProcessor(false, {})).to.equal(false)
        })
        
        it('should create state if status is not null/false', () => {
            const state = {
                stateName: 'consentOrderMade',
                actionGoTo: 'dummy action',
                ID: 1
            }
            const caseData = {
                jurisdiction: 'DIVORCE',
                case_type_id: 'financialremedymvp2'
            }
            const res = {
                name: 'Consent Order Made',
                actionGoTo: 'dummy action',
                ID: 1
            }
            expect(caseStatusProcessor(state, caseData)).to.deep.equal(res)
        })

        it('should create state if status is not null/false, but jurisdiction doesn\'t exist', () => {
            const state = {
                stateName: 'dummy name',
                actionGoTo: 'dummy action',
                ID: 1
            }
            const caseData = {
                jurisdiction: 'dummy',
                case_type_id: 'financialremedymvp2'
            }
            const res = {
                name: 'dummy name',
                actionGoTo: 'dummy action',
                ID: 1
            }
            expect(caseStatusProcessor(state, caseData)).to.deep.equal(res)
        })
    })

})
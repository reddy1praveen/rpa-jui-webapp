import 'mocha'
import * as chai from 'chai'
const expect = chai.expect
import { caseStateFilter, createCaseState, getDocId } from './case-state-util'

describe('case-state-util', () => {
    
    it('should expose caseStateFilter function', () => {
        expect(caseStateFilter).to.be.ok
    })
    
    describe('caseStateFilter', () => {
        it('should filter case state', () => {
            expect(caseStateFilter({
                state: {
                    stateName: 'question_drafted'
                }
            })).to.equal('question_drafted')
        })
    })

    describe('getDocId', () => {
        it('should return Doc Id', () => {
            expect(getDocId({document_url: 'http://domain/host/files/fileid123.pdf'})).to.equal('fileid123.pdf')
        })
    })

    describe('createCaseState', () => {
        
        it('should return case state object', () => {
            const state = null
            const date = new Date()

            const result = {
                stateName: state,
                stateDateTime: date,
                actionGoTo: 'summary',
                ID: null
            }
            expect(createCaseState(state, date, null)).to.deep.equal(result)
        })

        it('should return case state object with actionUrl', () => {
            const state = null
            const date = new Date()
            const actionUrl = 'dummy'
            const id = 1

            const result = {
                stateName: state,
                stateDateTime: date,
                actionGoTo: actionUrl,
                ID: id
            }
            expect(createCaseState(state, date, actionUrl, id)).to.deep.equal(result)
        })
    })
})
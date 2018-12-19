import 'mocha'

import * as chai from 'chai'
import {expect} from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import {mockReq, mockRes} from 'sinon-express-mock'
chai.use(sinonChai)

import * as coh from './coh'
import {getOrCreateHearing, relistHearing, shouldTest} from './coh'

describe('Continous online hearing service', () => {

    it('should be testable', () => {
        expect(shouldTest()).to.equal(true)
    })

    // it('Should pass in caseId and userId, and use these values to get the hearing id.', () => {
    //     const caseId = 'caseIdReplaceWithMeaningfulValue'
    //     const userId = 'userIdReplaceWithMeaningfulValue'
    //     const state = 'issued'
    //     const reason = 'freetext'
    //
    //     const spy = sinon.spy(coh, 'getOrCreateHearing')
    //
    //     relistHearing(caseId, userId, state, reason)
    //
    //     expect(spy).to.have.been.calledOnce()
    //     // expect(shouldTest()).to.equal(false)
    // })

    // it('should redirect to index page', () => {
    //     const req = mockReq({})
    //     const res = mockRes()
    //     logout(req, res)
    //     expect(res.redirect).to.be.calledWith('/')
    // })

})

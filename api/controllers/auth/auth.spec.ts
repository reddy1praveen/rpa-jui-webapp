import 'mocha'
import * as sinon from 'sinon'
import * as chai from 'chai'
import { expect } from 'chai'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
chai.use(sinonChai)

import { config } from '../../../config'
import { logout, authFn } from './index'

describe('Auth', () => {

    describe('logOut', () => {
        it('should delete auth cookie', () => {
            const req = mockReq({})
            const res = mockRes()
            logout(req, res)
            expect(res.clearCookie).to.be.calledWith(config.cookies.token)
        })

        it('should redirect to index page', () => {
            const req = mockReq({})
            const res = mockRes()
            logout(req, res)
            expect(res.redirect).to.be.calledWith('/')
        })
    })
    
    describe('auth', () => {
        let getDetails
        let postOauthToken
        let req
        let res
        
        beforeEach(() => {
            postOauthToken = sinon.stub().resolves({access_token: 'access'})
            getDetails = sinon.stub().resolves({id: 1, name: 'testuser'})
            req = mockReq({
                get: () => 'localhost',
                query: {
                    code: 1
                }
            })
            res = mockRes()

            
        })
        

        it('should set the authorisation header', (done) => {
            authFn(req, res, null, postOauthToken, getDetails)
            expect(postOauthToken).to.be.calledWith(1, 'localhost')
            expect(getDetails).to.have.been.calledWith(sinon.match({ headers: { Authorization: 'Bearer access' } }))
            done()
        })
    })
})

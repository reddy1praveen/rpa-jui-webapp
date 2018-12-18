import 'mocha'

import * as chai from 'chai'
import { expect } from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'

chai.use(sinonChai)

import { config } from '../../../config'
import * as idam from '../../services/idam-api/idam-api'
import { logout } from './index'

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
        let req
        let res
        beforeEach(() => {
            const idamSpy = sinon.spy(idam, 'postOauthToken')

            sinon.stub(idam, 'postOauthToken').callsFake(function fakeFn() {
             console.log('this has been called 1')
             return Promise.resolve({access_token: 'access'})
         })
            sinon.stub(idam, 'getDetails').callsFake(function fakeFn() {
             console.log('this has been called')
             return Promise.resolve({id: 1, name: 'testuser'})
         })
 
            req = mockReq({
                get: () => 'localhost',
                query: {
                    code: 1,
                },
            })
            res = mockRes()
        })

        it('should set the authorisation header', async () => {
            await authenticateUser(req, res, null)
           // expect(idam.postOauthToken).to.be.calledWith(1, 'localhost')
            // expect(idam.getDetails).to.have.been.calledWith(sinon.match({ headers: { Authorization: 'Bearer access' } }))
            expect(idam.getDetails).to.have.been.called()
        })
    })


})

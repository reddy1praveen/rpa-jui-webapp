import 'mocha'

import * as chai from 'chai'
import { expect } from 'chai'
import * as simonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
chai.use(simonChai)

import { config } from '../../../config'
import { logout } from './index'


// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('Auth', () => {
    describe('logOut', () => {
        it('should delete auth cookie and redirect to index page', () => {
            const req = mockReq({})
            const res = mockRes()
            logout(req, res)
            expect(res.clearCookie).to.be.calledWith(config.cookies.token)
         //   expect(res.redirect).to.be.calledWith(config.indexUrl)
        })
    })

    describe('getTokenFromCode', () => {
     //   it('should delete auth cookie and redirect to index page', () => {})
    })
})

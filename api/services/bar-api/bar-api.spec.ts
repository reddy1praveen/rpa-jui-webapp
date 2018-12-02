import 'mocha'
import * as chai from 'chai'
import { expect } from 'chai'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
chai.use(sinonChai)

import { noPreserveCache as proxyquire } from 'proxyquire'
import { config } from '../../../config'
import * as express from 'express'

import { getHealth, getInfo } from './bar-api'

const url = config.services.s2s

describe('bar-api', () => {
    let route
    let request
    let app
    let httpRequest
    let httpResponse

    // beforeEach(() => { 
    //     httpRequest = mockReq({})
    //     httpResponse = mockRes()
        
    //     app = express()

    //     route = proxyquire('./bar-api.js', {
    //         '../../lib/request/request': httpRequest
    //     })

    //     route(app)

    //     request = chai.supertest(app)
    // })

    // describe('getHealth', () => {
    //     let getHealth
        
    //     beforeEach(() => {
    //         getHealth = route.getHealth            
    //     })

    //     it('should expose function', () => {
    //         expect(getHealth).to.be.true
    //     })

    //     it('should make a request', () => {
    //         getHealth({})
    //         expect(request).calledWith('GET', `${url}/health`, {})
    //     })
    // })
    
    // describe('getInfo', () => {
    //     let getInfo
        
    //     beforeEach(() => {
    //         getInfo = route.getInfo
    //     })
        
    //     it('should expose function', () => {
    //         expect(getInfo).to.be.true
    //     })
        
    //     it('should make a request', () => {
    //         getInfo({})
    //         expect(request).to.be.calledWith('GET', `${url}/info`, {})
    //     })
    // })
})
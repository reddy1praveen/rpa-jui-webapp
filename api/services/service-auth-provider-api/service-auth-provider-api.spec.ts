import 'mocha'

import * as chai from 'chai'
import { expect } from 'chai'
import * as simonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
chai.use(simonChai)
import { noPreserveCache as proxyquire } from 'proxyquire'
import { config } from '../../../config'

const url = config.services.s2s

describe('service-auth-provider-api spec', () => {
    let route
    let request
    let app
    let httpRequest
    let httpResponse


    describe('getHealth', () => {
        let getHealth

        beforeEach(() => {
            route = proxyquire('./service-auth-provider-api.ts', {
                '../../lib/request/request': httpRequest
            })
            console.log(route)
            getHealth = route.getHealth
            debugger;
        })

        it('should expose function', () => {
            // expect(getHealth).to.be.calledWith()
        })

        it('should make a request', () => {
            // getHealth({})
            // expect(httpRequest).calledWith('GET', `${url}/health`, {})
        })
    })

    describe('getInfo', () => {
        let getInfo

        beforeEach(() => {
            route = proxyquire('./service-auth-provider-api.ts', {
                '../../lib/request/request': httpRequest
            })
            getInfo = route.getInfo
        })

        it('should expose function', () => {
            // expect(getInfo).to.be.true
        })

        it('should make a request', () => {
            // getInfo({})
            // expect(httpRequest).to.be.calledWith('GET', `${url}/info`, {})
        })
    })
    //
    // describe('postS2SLease', () => {
    //     let postS2SLease
    //
    //     beforeEach(() => {
    //         postS2SLease = route.postS2SLease
    //     })
    //
    //     it('should expose function', () => {
    //         expect(postS2SLease).to.be.true;
    //     })
    //
    //     // need to figure out how to fake otp
    //     xit('should make a request', () => {
    //         postS2SLease({})
    //         expect(httpRequest).to.be.calledWith('POST', `${url}/lease`, {})
    //     })
})

import 'mocha'
import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import * as express from 'express'
import * as pq from 'proxyquire'
import * as supertest from 'supertest'

chai.use(sinonChai)
const expect = chai.expect
const assert = chai.assert
const proxyquire = pq.noPreserveCache()

import {config} from '../../../config'

const url = config.services.s2s

describe('service-auth-provider-api spec', () => {
    let route
    let request
    let app
    let httpRequest
    let httpResponse

    beforeEach(() => {
        httpResponse = (resolve, reject) => {
            resolve({})
        }
        httpRequest = sinon.stub()
        httpRequest.callsFake((url, options) => new Promise(httpResponse))

        app = express()

        route = proxyquire('./service-auth-provider-api.ts', {
            '../../lib/request/request': httpRequest
        })

        route(app)

        request = supertest(app)
    })

    describe('getHealth', () => {
        let getHealth

        beforeEach(() => {
            getHealth = route.getHealth
        })

        it('should expose function', () => {
            expect(getHealth).to.be.ok
        })

        it('should make a request', () => {
            getHealth({})
            expect(httpRequest).to.have.been.calledWith('GET', `${url}/health`, {})
        })
    })

    describe('getInfo', () => {
        let getInfo

        beforeEach(() => {
            getInfo = route.getInfo
        })

        it('should expose function', () => {
            expect(getInfo).to.be.ok
        })

        it('should make a request', () => {
            getInfo({})
            expect(httpRequest).to.have.been.calledWith('GET', `${url}/info`, {})
        })
    })

    describe('postS2SLease', () => {
        let postS2SLease

        beforeEach(() => {
            postS2SLease = route.postS2SLease
        })

        it('should expose function', () => {
            expect(postS2SLease).to.be.ok
        })

        // need to figure out how to fake otp
        xit('should make a request', () => {
            postS2SLease({})
            expect(httpRequest).to.have.been.calledWith('POST', `${url}/lease`, {})
        })
    })
})

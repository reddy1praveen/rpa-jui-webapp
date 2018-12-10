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

import { config } from '../../../config'

const url = config.services.em_anno_api

describe('em-anno-api spec', () => {
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

        route = proxyquire('./em-anno-api.ts', {
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

    describe('getAnnotionSet', () => {
        let getAnnotionSet

        beforeEach(() => {
            getAnnotionSet = route.getAnnotionSet
        })

        it('should expose function', () => {
            expect(getAnnotionSet).to.be.ok
        })

        it('should make a getAnnotionSet request', () => {
            getAnnotionSet('x', {})
            expect(httpRequest).to.have.been.calledWith('GET', `${url}/api/annotation-sets/filter?documentId=x`, {})
        })
    })

    describe('createAnnotationSet', () => {
        let createAnnotationSet

        beforeEach(() => {
            createAnnotationSet = route.createAnnotationSet
        })

        it('should expose function', () => {
            expect(createAnnotationSet).to.be.ok
        })

        it('should make a createAnnotationSet request', () => {
            createAnnotationSet({})
            expect(httpRequest).to.have.been.calledWith('POST', `${url}/api/annotation-sets/`, {})
        })
    })

    describe('addAnnotation', () => {
        let addAnnotation

        beforeEach(() => {
            addAnnotation = route.addAnnotation
        })

        it('should expose function', () => {
            expect(addAnnotation).to.be.ok
        })

        it('should make a addAnnotation request', () => {
            addAnnotation({})
            expect(httpRequest).to.have.been.calledWith('POST', `${url}/api/annotations`, {})
        })
    })
    
    describe('deleteAnnotation', () => {
        let deleteAnnotation

        beforeEach(() => {
            deleteAnnotation = route.deleteAnnotation
        })

        it('should expose function', () => {
            expect(deleteAnnotation).to.be.ok
        })

        it('should make a deleteAnnotation request', () => {
            deleteAnnotation('x', {})
            expect(httpRequest).to.have.been.calledWith('DELETE', `${url}/api/annotations/x`, {})
        })
    })
})

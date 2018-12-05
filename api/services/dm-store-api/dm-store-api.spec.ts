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

const url = config.services.dm_store_api

describe('dm-store-api spec', () => {
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

        route = proxyquire('./dm-store-api.ts', {
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
            expect(httpRequest).to.have.been.calledWith('GET', `${config.services.dm_store_api}/health`, {})
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
            expect(httpRequest).to.have.been.calledWith('GET', `${config.services.dm_store_api}/info`, {})
        })
    })

    describe('getDocumentBinary', () => {
        let getDocumentBinary

        beforeEach(() => {
            getDocumentBinary = route.getDocumentBinary
        })

        it('should expose getDocumentBinary function', () => {
            expect(getDocumentBinary).to.be.ok
        })

        it('should make a request', () => {
            getDocumentBinary('1234', {})
            expect(httpRequest).to.have.been.calledWith('GET', `${config.services.dm_store_api}/documents/1234/binary`, {})
        })
    })

    describe('getDocumentThumbnail', () => {
        let getDocumentThumbnail

        beforeEach(() => {
            getDocumentThumbnail = route.getDocumentThumbnail
        })

        it('should expose getDocumentBinary function', () => {
            expect(getDocumentThumbnail).to.be.ok
        })

        it('should make a request', () => {
            getDocumentThumbnail('1234', {})
            expect(httpRequest).to.have.been.calledWith('GET', `${config.services.dm_store_api}/documents/1234/thumbnail`, {})
        })
    })

    describe('getDocuments', () => {
        let getDocuments

        beforeEach(() => {
            getDocuments = route.getDocuments
        })

        it('should expose getDocuments function', () => {
            expect(getDocuments).to.be.ok
        })

        it('should return a promise of all outstanding requests', () => {
            expect(getDocuments().then).to.be.ok
        })

        it('should return all documents requested', done => {
            const docIds = ['1234', '5678']
            httpResponse = (resolve, reject) => {
                resolve({ docId: '1234' })
            }

            getDocuments(docIds, {}).then(documents => {
                expect(documents).deep.equal([{ docId: '1234' }, { docId: '1234' }])
                done()
            })
        })
    })
})

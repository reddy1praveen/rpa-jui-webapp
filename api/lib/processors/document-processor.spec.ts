import 'mocha'
import * as chai from 'chai'
const expect = chai.expect
import * as documentProcessor from './document-processor'

describe('document-processor', () => {
    
    it('should return array of single doc', () => {
        const doc = {document_url: 'http://domain/host/files/fileid123.pdf'}
        const caseData = {}
        const res = [{
            document_url: 'http://domain/host/files/fileid123.pdf',
            id: 'fileid123.pdf'
        }]
        expect(documentProcessor.default(doc, caseData)).to.deep.equal(res)
    })

    it('should return array of multiple docs', () => {
        const doc = [
            {document_url: 'http://domain/host/files/fileid123.pdf'},
            {document_url: 'http://domain/host/files/fileid124.pdf'}
        ]
        const caseData = {
            documents: [
            'fileid119.pdf',
            'fileid120.pdf',
            'fileid121.pdf',
            'fileid122.pdf'
            ]
        }
        const res = [{
            document_url: 'http://domain/host/files/fileid123.pdf',
            id: 'fileid123.pdf'
        },{
            document_url: 'http://domain/host/files/fileid124.pdf',
            id: 'fileid124.pdf'
        }]
        expect(documentProcessor.default(doc, caseData)).to.deep.equal(res)
    })
})
import 'mocha'
import * as chai from 'chai'
const expect = chai.expect
const module = require('./headerUtilities')

describe('shouldReturn', () => {
    let shouldReturn

    beforeEach(() => {
        shouldReturn = module.shouldReturn
    })

    it('should expose function', () => {
        expect(shouldReturn).to.be.ok
    })
})

describe('getAuthHeaders', () => {
    let getAuthHeaders

    beforeEach(() => {
        getAuthHeaders = module.getAuthHeaders
    })

    it('should expose function', () => {
        expect(getAuthHeaders).to.be.ok
    })
})

describe('getAuthHeadersWithS2SBearer', () => {
    let getAuthHeadersWithS2SBearer

    beforeEach(() => {
        getAuthHeadersWithS2SBearer = module.getAuthHeadersWithS2SBearer
    })

    it('should expose function', () => {
        expect(getAuthHeadersWithS2SBearer).to.be.ok
    })
})

describe('getAuthHeadersWithUserRoles', () => {
    let getAuthHeadersWithUserRoles

    beforeEach(() => {
        getAuthHeadersWithUserRoles = module.getAuthHeadersWithUserRoles
    })

    it('should expose function', () => {
        expect(getAuthHeadersWithUserRoles).to.be.ok
    })
})

describe('getAuthHeadersWithUserIdAndRoles', () => {
    let getAuthHeadersWithUserIdAndRoles

    beforeEach(() => {
        getAuthHeadersWithUserIdAndRoles = module.getAuthHeadersWithUserIdAndRoles
    })

    it('should expose function', () => {
        expect(getAuthHeadersWithUserIdAndRoles).to.be.ok
    })
})

describe('getAuthHeadersWithBody', () => {
    let getAuthHeadersWithBody

    beforeEach(() => {
        getAuthHeadersWithBody = module.getAuthHeadersWithBody
    })

    it('should expose function', () => {
        expect(getAuthHeadersWithBody).to.be.ok
    })
})
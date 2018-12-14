import 'mocha'
import * as chai from 'chai'
const expect = chai.expect
const module = require('./headerUtilities')

describe('shouldReturn', () => {
    let shouldReturn

    beforeEach(() => {
        shouldReturn = module.shouldReturn
    })

    it('should return false', () => {
        expect(shouldReturn()).to.be.equal(false)
    })
})

describe('getAuthHeaders', () => {
    let getAuthHeaders

    beforeEach(() => {
        getAuthHeaders = module.getAuthHeaders
    })

    it('should return headers', () => {
        const req = {
            auth: {
                token: 'x'
            },
            headers: {
                ServiceAuthorization: 'z'
            }
        }
        const res = {
            headers: {
                Authorization: 'Bearer x',
                ServiceAuthorization: 'z'
            }
        }
        expect(getAuthHeaders(req)).to.deep.equal(res)
    })
})

describe('getAuthHeadersWithS2SBearer', () => {
    let getAuthHeadersWithS2SBearer

    beforeEach(() => {
        getAuthHeadersWithS2SBearer = module.getAuthHeadersWithS2SBearer
    })

    it('should return S2SBearer header', () => {
        const req = {
            auth: {
                token: 'x'
            },
            headers: {
                ServiceAuthorization: 'z'
            }
        }
        const res = {
            headers: {
                Authorization: 'Bearer x',
                ServiceAuthorization: 'Bearer z'
            }
        }
        expect(getAuthHeadersWithS2SBearer(req)).to.deep.equal(res)
    })
})

describe('getAuthHeadersWithUserRoles', () => {
    let getAuthHeadersWithUserRoles

    beforeEach(() => {
        getAuthHeadersWithUserRoles = module.getAuthHeadersWithUserRoles
    })

    it('should return header with user roles', () => {
        const req = {
            auth: {
                token: 'x',
                data: 'y'
            },
            headers: {
                ServiceAuthorization: 'z'
            }
        }
        const res = {
            headers: {
                Authorization: 'Bearer x',
                ServiceAuthorization: 'z',
                'user-roles': 'y'
            }
        }
        expect(getAuthHeadersWithUserRoles(req)).to.deep.equal(res)
    })
})

describe('getAuthHeadersWithUserIdAndRoles', () => {
    let getAuthHeadersWithUserIdAndRoles

    beforeEach(() => {
        getAuthHeadersWithUserIdAndRoles = module.getAuthHeadersWithUserIdAndRoles
    })

    it('should return header with user ID and roles', () => {
        const req = {
            auth: {
                userId: 'x'
            },
            headers: {
                ServiceAuthorization: 'z'
            }
        }
        const res = {
            headers: {
                ServiceAuthorization: 'z',
                'user-id': 'x',
                'user-roles': 'x'
            }
        }
        expect(getAuthHeadersWithUserIdAndRoles(req)).to.deep.equal(res)
    })
})

describe('getAuthHeadersWithBody', () => {
    let getAuthHeadersWithBody

    beforeEach(() => {
        getAuthHeadersWithBody = module.getAuthHeadersWithBody
    })

    it('should return header with empty body', () => {
        const req = {
            auth: {
                token: 'x'
            },
            headers: {
                ServiceAuthorization: 'z'
            }
        }
        const res = {
            headers: {
                Authorization: 'Bearer x',
                ServiceAuthorization: 'z'
            },
            body: {}
        }
        expect(getAuthHeadersWithBody(req)).to.deep.equal(res)
    })

    it('should return header with body from req', () => {
        const req = {
            auth: {
                token: 'x'
            },
            headers: {
                ServiceAuthorization: 'z'
            },
            body: {
                id: 'y'
            }
        }
        const res = {
            headers: {
                Authorization: 'Bearer x',
                ServiceAuthorization: 'z'
            },
            body: {
                id:'y'
            }
        }
        expect(getAuthHeadersWithBody(req)).to.deep.equal(res)
    })
})
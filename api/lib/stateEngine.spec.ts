import 'mocha'

import * as chai from 'chai'
import { expect } from 'chai'
import * as sinon from 'sinon'
import * as simonChai from 'sinon-chai'
import { handleInstruction, handleState } from '../lib/stateEngine'
import * as states from '../lib/stateEngine'

import { mockReq, mockRes } from 'sinon-express-mock'

import * as idam from '../services/idam-api/idam-api'

import { authenticateUser } from '../controllers/auth'

chai.use(simonChai)

const mapping = [
    {
        event: 'continue',
        result: 'test',
        state: 'create',
    },
    {
        event: 'continue',
        states: [
            {
                conditions: [
                    {
                        condition: [{ preliminaryView: 'yes' }],
                        result: 'preliminary-advanced',
                    },
                    {
                        condition: [{ preliminaryView: 'no' }],
                        result: 'final-decision',
                    },
                ],
                state: 'create',
            },
            {
                result: 'check-final-decision',
                state: 'final-decision',
            },
        ],
    },
]

describe('State Engine', () => {
    describe('handleCondition', () => {
        it('should evaluate a condition and return a result if true', () => {
            const variables = {
                preliminaryView: 'yes',
            }

            expect(states.handleCondition(mapping[1].states[0].conditions[0], variables)).to.equal('preliminary-advanced')
        })

        it('should evaluate a condition and return null  if false', () => {
            const variables = {
                preliminaryView: 'no',
            }
            expect(states.handleCondition(mapping[1].states[0].conditions[0], variables)).to.equal(null)
        })
    })

    // describe('handleInstruction', () => {
    //     it('should dispatch a single state in an instruction to handlestate', () => {
    //         const variables = {
    //             preliminaryView: 'yes',
    //         }

    //         sinon.stub(states, 'handleState').returns([])

    //         states.handleInstruction(mapping[0], 'create', variables)

    //         expect(handleState).to.be.calledOnce()
    //     })
    // })

    describe('authenticate user', () => {
        let req
        let res
        let sandbox
        const accessToken = 'access'
        const details = { id: 1, name: 'testuser' }
        beforeEach(() => {
            sandbox = sinon.createSandbox()
            sandbox.stub(idam, 'postOauthToken').resolves({ access_token: `${accessToken}` })

            req = mockReq({
                get: () => 'localhost',
                query: {
                    code: 1,
                },
                session: {
                    user: null,
                },
            })
            res = mockRes()
        })

        afterEach(() => {
            sandbox.restore()
        })

        it('should set the authorisation header', async () => {
            await authenticateUser(req, res)
            expect(idam.postOauthToken).to.be.calledWith(1, 'localhost')
        })
    })
})

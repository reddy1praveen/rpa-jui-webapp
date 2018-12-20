import 'mocha'

import * as chai from 'chai'
import { expect } from 'chai'
import * as sinon from 'sinon'
import * as simonChai from 'sinon-chai'
import * as states from '../lib/stateEngine'

chai.use(simonChai)

const mapping = [
    {
        event: 'continue',
        result: 'test',
        state: 'create'
    },
    {
        event: 'continue',
        states: [
            {
                conditions: [
                    {
                        condition: [{ preliminaryView: 'yes' }],
                        result: 'preliminary-advanced'
                    },
                    {
                        condition: [{ preliminaryView: 'no' }],
                        result: 'final-decision'
                    }
                ],
                state: 'create'
            },
            {
                result: 'check-final-decision',
                state: 'final-decision'
            }
        ]
    }
]

describe('State Engine', () => {
    describe('handleCondition', () => {
        it('should evaluate a condition and return a result if true', () => {
            const variables = {
                preliminaryView: 'yes'
            }

            expect(states.handleCondition(mapping[1].states[0].conditions[0], variables)).to.equal('preliminary-advanced')
        })

        it('should evaluate a condition and return null  if false', () => {
            const variables = {
                preliminaryView: 'no'
            }
            expect(states.handleCondition(mapping[1].states[0].conditions[0], variables)).to.equal(null)
        })
    })

    describe('handleInstruction', () => {
        it('should dispatch a single state in an instruction to handlestate', () => {
            const variables = {
                preliminaryView: 'yes'
            }

            const stub = sinon.stub(states, 'handleState').resolves()

            states.handleInstruction(mapping[0], 'create', variables)

            expect(states.handleState).to.be.calledOnce()
        })
    })
})

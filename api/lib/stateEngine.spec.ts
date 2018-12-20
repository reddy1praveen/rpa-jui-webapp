import 'mocha'

import * as chai from 'chai'
import { expect } from 'chai'
import * as sinon from 'sinon'
import * as simonChai from 'sinon-chai'
import { handleInstruction, handleState } from '../lib/stateEngine'
import * as states from '../lib/stateEngine'

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
                condition: [{ test2: 'yes' }],
                result: 'test2-page',
                state: 'create',
            },
            {
                result: 'check-final-decision',
                state: 'another',
            },
        ],
    },
    {
        event: 'continue',
        result: 'no-state',
    },
    {
        register: [],
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

    describe('handleInstruction', () => {
        it('should resolve a result for a single matching state', () => {
            expect(states.handleInstruction(mapping[0], 'create', {})).to.equal('test')
        })

        it('should not resolve a result for a single non-matching state', () => {
            expect(states.handleInstruction(mapping[0], 'test', {})).to.equal(null)
        })

        it('should not resolve a result for a one match from multiple states', () => {
            expect(states.handleInstruction(mapping[1], 'another', {})).to.equal('check-final-decision')
        })

        it('should  resolve a result for no states', () => {
            expect(states.handleInstruction(mapping[2], '', {})).to.equal('no-state')
        })
    })

    describe('handleState', () => {
        it('should resolve a result for a single condition', () => {
            expect(
                states.handleState(mapping[1].states[1], {
                    test2: 'yes',
                })
            ).to.equal('test2-page')
        })

        it('should resolve a results for a multiple conditions', () => {
            expect(
                states.handleState(mapping[1].states[0], {
                    preliminaryView: 'yes',
                })
            ).to.equal('preliminary-advanced')

            expect(
                states.handleState(mapping[1].states[0], {
                    preliminaryView: 'no',
                })
            ).to.equal('final-decision')
        })

        it('should resolve a results without a condition', () => {
            expect(states.handleState(mapping[1].states[2], {})).to.equal('check-final-decision')
        })
    })

    describe('getRegister', () => {
        it('should be able to find the register in a mapping if it has one', () => {
            expect(states.getRegister(mapping).length).to.equal(1)
        })
    })
})

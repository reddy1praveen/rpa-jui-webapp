import * as log4js from 'log4js'
import { map } from 'p-iteration'
import { config } from '../../config'
import { some } from './util'

import { pushStack, shiftStack } from '../lib/stack'

const logger = log4js.getLogger('state engine')
logger.level = config.logging ? config.logging : 'OFF'

// does not handle OR yet
export function handleCondition(conditionNode, variables) {
    // index 0 hardcoded, not interating through for OR
    const key = Object.keys(conditionNode.condition[0])[0]

    if (variables[key] === conditionNode.condition[0][key]) {
        return conditionNode.result // eslint-disable-line no-param-reassign
    }
    return null
}

export function handleState(stateNode, variables) {
    if (stateNode.condition) {
        return handleCondition(stateNode, variables)
    } else if (stateNode.conditions) {
        logger.info(`Found multiple conditions for ${stateNode.state}`)
        return some(stateNode.conditions, conditions => handleCondition(conditions, variables))
    } else if (stateNode.result) {
        logger.info(`State result without conditional: ${stateNode.result}`)
        return stateNode.result
    }
    return null
}

export function handleInstruction(instruction, stateId, variables) {
    if (instruction.state && instruction.state === stateId) {
        return handleState(instruction, variables)
    } else if (instruction.states) {
        logger.info(`Found multiple states for ${instruction.event}`)
        return some(instruction.states, stateNode => {
            if (stateNode.state === stateId) {
                return handleState(stateNode, variables)
            }

            return false
        })
    }
    return null
}

export async function process(req, res, mapping, payload, templates, store) {
    const jurisdiction = req.params.jurId
    const caseId = req.params.caseId
    const caseTypeId = req.params.caseTypeId.toLowerCase()
    const stateId = req.params.stateId

    const event = req.body.event
    let variables = req.body.formValues

    let meta = {}
    let newRoute = null

    if (variables) {
        // get current store
        let stored = await store.get(`decisions_${jurisdiction}_${caseTypeId}_${caseId}`)
        if (!(stored + '').length) {
            stored = {}
        }
        await store.set(`decisions_${jurisdiction}_${caseTypeId}_${caseId}`, { ...stored, ...variables })
    }

    if (req.method === 'POST') {
        console.log('event', event)
        await map(mapping, async (instruction: any) => {
            if (instruction.event === event) {
                // event is the main index and so there can only be one instruction per event - exit after finding
                logger.info(`Found matching event for ${event}`)

                let result = handleInstruction(instruction, stateId, variables)

                if (Array.isArray(result)) {
                    await pushStack(req, result)
                    result = await shiftStack(req, variables)
                    logger.info(`Popped stack ${result}`)
                } else if (result === '...') {
                    result = await shiftStack(req, variables)
                } else if (result === '[state]') {
                    result = req.params.stateId
                } else if (result === '.') {
                    result = await payload(req, res, variables)
                }

                if (result) {
                    logger.info(`result is ${result}`)
                    meta = templates[caseTypeId][result]
                    newRoute = result
                } else {
                    logger.error(`No result found`)
                }
            }
            return false
        })
    } else {
        console.log(caseTypeId)
        meta = templates[caseTypeId][stateId]
    }

    variables = await store.get(`decisions_${jurisdiction}_${caseTypeId}_${caseId}`) || {}

    const response = {
        formValues: variables,
        meta,
        newRoute,
    }
    req.session.save(() => res.send(JSON.stringify(response)))
}

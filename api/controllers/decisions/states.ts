import * as camelcase from 'camelcase'
import * as express from 'express'
import * as log4js from 'log4js'
import { map } from 'p-iteration'
import { config } from '../../../config'
import { Store } from '../../lib/store/store'
import { isObject } from '../../lib/util'
import * as coh from '../../services/coh'
import * as divorce from './divorce'
import * as sscs from './sscs'

const divorceType = 'DIVORCE'
const sscsType = 'SSCS'

const logger = log4js.getLogger('scss engine')
logger.level = config.logging ? config.logging : 'OFF'

function some(array, predicate) {
    for (const item in array) {
        if (array[item]) {
            const result = predicate(array[item])
            if (result) {
                return result
            }
        }
    }
    return null
}


async function pushStack(req, stack) {
    logger.info('Pushing stack')
    const jurisdiction = req.params.jurId
    const caseId = req.params.caseId
    const caseTypeId = req.params.caseTypeId.toLowerCase()
    let newStack = [...stack]

    const store = new Store(req)

    const currentStack = await store.get(`decisions_stack_${jurisdiction}_${caseTypeId}_${caseId}`)
    if (currentStack === '' || currentStack === null) {
        newStack = [...currentStack, stack]
    }
    await store.set(`decisions_stack_${jurisdiction}_${caseTypeId}_${caseId}`, newStack)
}

async function shiftStack(req, variables) {
    const jurisdiction = req.params.jurId
    const caseId = req.params.caseId
    const caseTypeId = req.params.caseTypeId.toLowerCase()

    let matching = false
    let currentItem

    const store = new Store(req)

    const currentStack =  await  store.get(`decisions_stack_${jurisdiction}_${caseTypeId}_${caseId}`)


    while (!matching && currentStack.length) {

        logger.info(`popped stack ${currentStack}`)
        currentItem = currentStack.shift()
        logger.info(`Got item ${currentItem}`)
        logger.info(currentItem)
        await store.set(`decisions_stack_${jurisdiction}_${caseTypeId}_${caseId}`, currentStack)
    
        const currentStack2 =  await  store.get(`decisions_stack_${jurisdiction}_${caseTypeId}_${caseId}`)

        if (isObject(currentItem)) {
            const key = Object.keys(currentItem)[0]
            if (Object.keys(currentItem).length) { // item is an object with variable to evaluate
                matching = (variables[key]) ? currentItem[key] : null
                currentItem = currentItem[key]
            }
        } else {
            console.log('no object')
        }

    }

    console.log(currentItem)
    return currentItem
}

// does not handle OR yet
function handleCondition(conditionNode, variables) {
    // index 0 hardcoded, not interating through for OR
    const key = Object.keys(conditionNode.condition[0])[0]

    if (variables[key] === conditionNode.condition[0][key]) {
        return conditionNode.result // eslint-disable-line no-param-reassign
    }
    return null
}

function handleState(stateNode, variables) {
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

function handleInstruction(instruction, stateId, variables) {
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
    } else {
        // no states
        logger.info(`Instruction result without state: ${instruction.result} `)
        return instruction.result
    }
    return null
}

async function stackEmpty(req) {
    const store = new Store(req)
    const jurisdiction = req.params.jurId
    const caseId = req.params.caseId
    const caseTypeId = req.params.caseTypeId.toLowerCase()

    const currentStack =  await  store.get(`decisions_stack_${jurisdiction}_${caseTypeId}_${caseId}`)
    console.log('current', currentStack)
    return !currentStack.length
}

function forwardStack(register, stateId) {
    console.log(stateId)
    const index = register.map(x =>   Object.keys(x)[0] ).indexOf(camelcase(stateId))
    logger.info(`Forwarding stack at ${index}`)
    console.log(register.slice(index + 1))
    return register.slice(index + 1)
}

function getRegister(mapping) {
    return mapping.filter(mapInstruction => mapInstruction.register)
}

async function process(req, res, mapping, payload, templates, store) {
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
        await map(mapping, async (instruction: any) => {
            if (instruction.event === event) {
                // event is the main index and so there can only be one instruction per event - exit after finding
                logger.info(`Found matching event for ${event} `)
                let result = handleInstruction(instruction, stateId, variables)
                logger.info(`result ${result}`)
                if (result === '<register>') {
                    const registerInstruction = getRegister(mapping)
                    await pushStack(req, registerInstruction[0].register)
                    result = await shiftStack(req, variables)
                    logger.info(`Popped stack ${registerInstruction[0].register}`)
                } else if (result === '...') {
                    if (await stackEmpty(req)) {
                            logger.info('Recalculating route ...')
                            const registerInstruction = getRegister(mapping)
                            await pushStack(req, forwardStack(registerInstruction[0].register, stateId))
                        }

                    result = await shiftStack(req, variables)
                } else if (result === '[state]') {
                    result = req.params.stateId
                } else if (result === '.') {
                    result = await payload(req, res, variables)
                }

                if (result) {
                    meta = templates[caseTypeId][result]
                    newRoute = result
                }
            }
            return false
        })
    } else {
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

async function handleStateRoute(req, res) {

    const jurisdiction = req.params.jurId

    const store = new Store(req)

    switch (jurisdiction) {
        case divorceType:
            process(req, res, divorce.mapping, divorce.payload, divorce.templates, new Store(req))
            break
        case sscsType:
            const hearingId = await sscs.init(req, res)
            process(req, res, sscs.mapping, sscs.payload, sscs.templates, new coh.Store(hearingId))
            break
        default:
    }
}

export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/decisions', router)

    router.get('/state/:jurId/:caseTypeId/:caseId/:stateId', handleStateRoute)
    router.post('/state/:jurId/:caseTypeId/:caseId/:stateId', handleStateRoute)
}

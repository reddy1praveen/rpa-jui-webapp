const express = require('express')
const config = require('../../../config')
const log4js = require('log4js')
const Store = require('../../lib/store/store')

const divorceType = 'DIVORCE'
const sscsType = 'SSCS'

const divorceMapping = require('./divorce/mapping.js')
const divorcePayload = require('./divorce')
const stateMeta = require('./divorce/state_meta')

const sscs = require('./sscs/')

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

// does not handle OR yet
function handleCondition(conditionNode, variables) {
    // index 0 hardcoded, not interating through for OR
    const key = Object.keys(conditionNode.condition[0])[0]
    console.log(conditionNode)
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
    }
    return null
}

function process(req, res, mapping, payload, templates) {
    const jurisdiction = req.params.jurId
    const caseId = req.params.caseId
    const caseTypeId = req.params.caseTypeId.toLowerCase()
    const stateId = req.params.stateId

    const event = req.body.event
    let variables = req.body.formValues

    let meta = {}
    let newRoute = null
console.log('test')
    const store = new Store(req)

    if (variables) {
        store.set(`decisions_${jurisdiction}_${caseTypeId}_${caseId}`, variables)
    }

    if (req.method === 'POST') {
        console.log(event)
        mapping.some((instruction, i) => {
            if (instruction.event === event) {
                // event is the main index and so there can only be one instruction per event - exit after finding
                logger.info(`Found matching event for ${event}`)
                let result = handleInstruction(instruction, stateId, variables)
                console.log(`result is ${result}`)
                if (result === '[state]') {
                    result = req.params.stateId
                } else if (result === 'end') {
                    payload(req, res)
                } else if (result) {
                    console.log('assigning meta',caseTypeId,result)
                    meta = templates[caseTypeId][result]
                    console.log(meta)
                    newRoute = result
                }
            }
            return false
        })
    } else {
        meta = templates[caseTypeId][stateId]
    }

    variables = store.get(`decisions_${jurisdiction}_${caseTypeId}_${caseId}`) || {}

    const response = {
        formValues: variables,
        newRoute,
        meta
    }
    req.session.save(() => res.send(JSON.stringify(response)))
}

function handleStateRoute(req, res) {
    console.log(req.method)
    
    const jurisdiction = req.params.jurId

    switch (jurisdiction) {
    case divorceType:
    console.log("divorce")
        process(req, res, divorceMapping, divorcePayload, stateMeta)
        //divorceCallback(req, res)
        break
    case sscsType:
    console.log('SSCS')
        process(req, res, sscs.mapping, {}, sscs.templates)
        break
    default:
    }
}

module.exports = app => {
    const router = express.Router({ mergeParams: true })
    app.use('/decisions', router)

    router.get('/state/:jurId/:caseTypeId/:caseId/:stateId', handleStateRoute)
    router.post('/state/:jurId/:caseTypeId/:caseId/:stateId', handleStateRoute)
}

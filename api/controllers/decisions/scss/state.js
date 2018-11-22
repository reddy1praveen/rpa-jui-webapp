const Store = require('../../../lib/store/store')
const config = require('../../../../config/index')
const template = require('./state_meta')
const log4js = require('log4js')
const templates = require('./templates')

const logger = log4js.getLogger('scss state')
logger.level = config.logging ? config.logging : 'OFF'

const ERROR404 = 404

/* eslint-disable-next-line complexity */
function handlePostState(req, res, responseJSON, state) {
    const store = new Store(req)
    const jurisdiction = req.params.jurId
    const caseId = req.params.caseId
    const caseTypeId = req.params.caseTypeId
    const formValues = req.body.formValues

    if (formValues) {
        store.set(`decisions_${jurisdiction}_${caseTypeId}_${caseId}`, formValues)
    }
}

function responseAssert(res, responseJSON, inJurisdiction, inStateId, statusHint) {
    if (template[inJurisdiction] && template[inJurisdiction][inStateId]) {
        res.status(ERROR404)
        responseJSON.statusHint = statusHint
        return false
    }

    return true
}

async function handleStateRoute(req, res) {
    const store = new Store(req)
    const jurisdiction = req.params.jurId
    const caseId = req.params.caseId
    const caseTypeId = req.params.caseTypeId
    const stateId = req.params.stateId

    const state = {
        jurisdiction,
        caseId,
        caseTypeId,
        stateId
    }

    const responseJSON = {}
    let result = true

    if (
        responseAssert(res, responseJSON, template[jurisdiction], 'Input parameter route_id: uknown jurisdiction') &&
        responseAssert(
            res,
            responseJSON,
            template[jurisdiction][stateId],
            `Input parameter route_id wrong: no route with this id inside jurisdiction ${jurisdiction}`
        )
    ) {
        responseJSON.meta = templates[jurisdiction][stateId]

        if (req.method === 'POST') {
            result = await handlePostState(req, res, responseJSON, state)
        }

        responseJSON.formValues = store.get(`decisions_${jurisdiction}_${caseTypeId}_${caseId}`) || {}
    }

    logger.info(store.get(`decisions_${jurisdiction}_${caseTypeId}_${caseId}`) || {})
    logger.info('Finished proccessing')
    if (result) {
        // no errors save and send responseJSON
        logger.info('Finishing with success')
        req.session.save(() => res.send(JSON.stringify(responseJSON)))
    } else {
        logger.error('Finishing with error')
    }
}

module.exports = (req, res) => {
    handleStateRoute(req, res)
}

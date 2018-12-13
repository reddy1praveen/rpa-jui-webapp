import * as express from 'express'
const { getHearingIdOrCreateHearing, getDecision, postDecision, putDecision } = require('../../services/coh-cor-api/coh-cor-api')
const { relistHearing } = require('../../services/coh')
const headerUtilities = require('../../lib/utilities/headerUtilities')

function getOptions(req) {
    return headerUtilities.getAuthHeaders(req)
}

export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/decisions', router)

    router.get('/:case_id', (req: any, res, next) => {
        const userId = req.auth.userId
        const caseId = req.params.case_id
        const options = getOptions(req)

        getHearingIdOrCreateHearing(caseId, userId, options)
            .then(hearingId => getDecision(hearingId, options))
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.setHeader('content-type', 'application/json')
                res.status(201).send(JSON.stringify(response))
            })
            .catch(response => {
                res.status(response.statusCode).send(response.error.message)
            })
    })

    router.post('/:case_id', (req: any, res, next) => {
        const userId = req.auth.userId
        const caseId = req.params.case_id
        const options = getOptions(req)

        getHearingIdOrCreateHearing(caseId, userId, options)
            .then(hearingId => postDecision(hearingId, options, req.body))
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.setHeader('content-type', 'application/json')
                res.status(201).send(JSON.stringify(response))
            })
            .catch(response => {
                console.log(response.error || response)
                res.status(response.error.status).send(response.error.message)
            })
    })

    router.put('/:case_id', (req: any, res, next) => {
        const userId = req.auth.userId
        const caseId = req.params.case_id
        const options = getOptions(req)

        getHearingIdOrCreateHearing(caseId, userId, options)
            .then(hearingId => putDecision(hearingId, options, req.body))
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.setHeader('content-type', 'application/json')
                res.status(200).send(JSON.stringify(response))
            })
            .catch(response => {
                console.log(response.error || response)
                res.status(response.error.status).send(response.error.message)
            })
    })

    router.put('/:case_id/hearing/relist', (req: any, res, next) => {

        console.log('relist')
        const userId = req.auth.userId
        const caseId = req.params.case_id
        const options = getOptions(req)

        // TODO: You might have to make sure that the Authorisation, and
        // ServiceAuth is being set on the request
        relistHearing(caseId, userId)
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.setHeader('content-type', 'application/json')
                console.log('response')
                console.log(response)
                res.status(200).send(JSON.stringify(response))
            })
            .catch(response => {
                console.log(response.error || response)
                res.status(response.error.status).send(response.error.message)
            })
    })
}

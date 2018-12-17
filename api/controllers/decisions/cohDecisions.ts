import * as express from 'express'
const {getHearingIdOrCreateHearing, getDecision, postDecision, putDecision} = require('../../services/coh-cor-api/coh-cor-api')
const {relistHearing} = require('../../services/coh')
const headerUtilities = require('../../lib/utilities/headerUtilities')

function getOptions(req) {
    return headerUtilities.getAuthHeaders(req)
}

export default app => {
    const router = express.Router({mergeParams: true})
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

    /**
     * PUT Relist a Hearing.
     *
     * A Judge can relist a hearing at any time.
     *
     * Relisting is done by hand, and we just need to send a message to CoH to re-list a hearing.
     *
     * The state that needs to be passed to CoH should either be 'issued' or 'draft', and not 'continuous_online_hearing_relisted'
     * as suggested by the wiki documentation.
     * [17.12.2018]
     */
    router.put('/:case_id/hearing/relist', async (req: any, res, next) => {
        const userId = req.auth.userId
        const caseId = req.params.case_id

        const state = req.body.state
        const reason = req.body.reason

        try {
            const response = await relistHearing(caseId, userId, state, reason)

            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('content-type', 'application/json')

            res.status(200).send(JSON.stringify(response))
        } catch (error) {

            res.status(error.status).send(error.message)
        }
    })
}

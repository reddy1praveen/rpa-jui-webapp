const express = require('express')
const divorceCallback = require('./divorce/state')
const scssCallback = require('./scss/state')

function handleStateRoute(req, res) {
    const jurisdiction = req.params.jurId

    switch (jurisdiction) {
    case 'DIVORCE':
        divorceCallback(req, res)
        break
    case 'SCSS':
        scssCallback(req, res)
        break
    default:
    }
}

module.exports = app => {
    const router = express.Router({ mergeParams: true })
    app.use('/decisions', router)

    router.get('/state/:jurId/:caseId/:stateId', handleStateRoute)
    router.post('/state/:jurId/:caseId/:stateId', handleStateRoute)
}
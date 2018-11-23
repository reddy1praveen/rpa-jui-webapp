const express = require('express')
const divorceCallback = require('./divorce/state')
const scssCallback = require('./scss/state')

const divorce = 'DIVORCE'
const scss = 'SCSS'

//const mapping = []

// function process(event, state) {
//     mapping.some((instruction, i) => {
//         if (instruction.event) {
//             return true //event is the main index and so there can only be one instruction per event - exit after finding
//         }
//     })
// }

function handleStateRoute(req, res) {
    const jurisdiction = req.params.jurId
    switch (jurisdiction) {
        case divorce:
            divorceCallback(req, res)
            break
        case scss:
            scssCallback(req, res)
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

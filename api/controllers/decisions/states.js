const express = require('express')
const divorceCallback = require('./divorce/state')
const scssCallback = require('./scss/state')

const divorce = 'DIVORCE'
const sscs = 'SSCS'

const mapping = require('./divorce/mapping.js')

// // does not handle OR yet
// function handleCondition(condition, i) {
//     // index 0 hardcoded, not interating through for OR
//     const key = Object.keys(condition.condition[0])[0]
//     if (variables[key] === condition.condition[key]) {
//         console.log('found')
//     }

// }

// function handleState(state) {
//     if (state.condition) {
//         handleCondition(state.conditon)
//     } else if (state.conditions) {
//         state.conditions.some(handleCondition)
//     }
// }

// function process(event, state) {
//     mapping.some((instruction, i) => {
//         if (instruction.event === event) {
//             // event is the main index and so there can only be one instruction per event - exit after finding
//             if (instruction.state) {
//                 handleState(instruction.state)
//             } else if (instruction.states) {
//                 instruction.states.array.forEach(state => {
//                     handleState(state)
//                 })
//             }
//             return true
//         }
//         return false
//     })
// }

function handleStateRoute(req, res) {
    const jurisdiction = req.params.jurId

    switch (jurisdiction) {
        case divorce:
            divorceCscssallback(req, res)
            break
        case sscs:
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

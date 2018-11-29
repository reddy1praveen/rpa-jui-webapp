const moment = require('moment')

const ccdStore = require('../../services/ccd-store-api/ccd-store')
const headerUtilities = require('./headerUtilities')

/**
 * getOptions
 *
 * TODO: This shouldn't need to be here.
 * @param req
 * @return {*|{headers}}
 */
function getOptions(req) {
    return headerUtilities.getAuthHeaders(req)
}

async function getTokenAndMakePayload(req, caseId) {

    console.log('getTokenAndMakePayload')

    const userId = req.auth.userId
    const authHeaders = getOptions(req)

    const eventTokenAndCase = await getEventTokenAndCase(userId, caseId, authHeaders)
    console.log('eventTokenAndCase');
    console.log(eventTokenAndCase);
}

async function getEventTokenAndCase(userId, caseId, authHeaders) {

    console.log('getEventTokenAndCase')

    const jurisdiction = 'DIVORCE'
    const caseType = 'FinancialRemedyMVP2'

    //TODO: This should change to upload.
    const eventId = 'FR_approveApplication'

    try {

        const eventTokenAndCase = await ccdStore.getEventTokenAndCase(
            userId,
            jurisdiction,
            caseType,
            caseId,
            eventId,
            authHeaders
        )

        return eventTokenAndCase

        // const eventToken = eventTokenAndCase.token
        // const caseDetails = eventTokenAndCase.caseDetails

        // console.log(`Got token ${eventToken}`)
        // console.log(caseDetails)
    } catch (error) {
        // console.log('exception')
        // console.log(exception)
        // logger.error('Error getting event token', exceptionFormatter(exception, exceptionOptions))
        return error
    }
}

// async function getEventTokenAndCase(req, caseId) {
//     console.log('getEventTokenAndCase')
//
//     console.log('req.auth.userId')
//     console.log(req.auth.userId)
//
//     console.log('caseId')
//     console.log(caseId)
//
//     try {
//         const event = 'FR_approveApplication'
//
//         const eventTokenAndCase = await ccdStore.getEventTokenAndCase(
//             req.auth.userId,
//             'DIVORCE',
//             'FinancialRemedyMVP2',
//             caseId,
//             event,
//             getOptions(req)
//         )
//
//         const eventToken = eventTokenAndCase.token
//         const caseDetails = eventTokenAndCase.caseDetails
//
//         console.log(`Got token ${eventToken}`)
//         console.log(caseDetails)
//     } catch (exception) {
//         console.log('exception')
//         console.log(exception)
//         // logger.error('Error getting event token', exceptionFormatter(exception, exceptionOptions))
//         return false
//     }
//     return false
// }

// if (decision === 'yes') {
//     payload = perpareCaseForApproval(
//         caseDetails,
//         eventToken,
//         'FR_approveApplication',
//         req.session.user,
//         store.get(`decisions_${state.inCaseId}`)
//     )
// }

// function perpareCaseForApproval(caseData, eventToken, eventId, user, store) {
//
//     return {
//         /* eslint-disable-next-line id-blacklist */
//         data: {
//             orderDirection: 'Order Accepted as drafted',
//             orderDirectionDate: moment(new Date()).format('YYYY-MM-DD'),
//             orderDirectionJudge: 'District Judge',
//             orderDirectionJudgeName: `${user.forename} ${user.surname} `,
//             orderDirectionAddComments: store.notesForAdmin
//         },
//         event: {
//             id: eventId
//         },
//         event_token: eventToken,
//
//         ignore_warning: true
//     }
// }

module.exports.getTokenAndMakePayload = getTokenAndMakePayload
module.exports.getEventTokenAndCase = getEventTokenAndCase

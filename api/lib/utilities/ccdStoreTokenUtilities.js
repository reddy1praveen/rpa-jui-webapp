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

    const jurisdiction = 'DIVORCE'
    const caseType = 'FinancialRemedyMVP2'
    const eventId = 'FR_approveApplication'

    const eventTokenAndCase = await getEventTokenAndCase(userId, caseId, jurisdiction, caseType, eventId, authHeaders)

    const eventToken = eventTokenAndCase.token
    const caseDetails = eventTokenAndCase.caseDetails

    console.log('eventTokenAndCase')
    console.log(eventToken)
    console.log(caseDetails)
}

/**
 * getEventTokenAndCase
 *
 * TODO: Not sure if we need both Authorization and ServiceAuthorization on this request.
 * TODO: Error handling passing back meaningful error.
 *
 * @param {String} userId - '96842'
 * @param {String} caseId - '1540909451019845'
 * @param {String} jurisdiction - 'DIVORCE'
 * @param {String} caseType - 'FinancialRemedyMVP2'
 * @param {String} eventId - 'FR_approveApplication'
 * @param {Object} authHeaders - { Authorization: 'Bearer eyJhb...', ServiceAuthorization: 'eyJhb...' }
 * @return {Promise.<*>}
 */
async function getEventTokenAndCase(userId, caseId, jurisdiction, caseType, eventId, authHeaders) {

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
    } catch (error) {
        console.log('error');
        console.log(error);
        // logger.error('Error getting event token', exceptionFormatter(exception, exceptionOptions))
        return error
    }
}

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

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

    const authHeaders = getOptions(req)

    console.log('getTokenAndMakePayload')

    const user = req.session.user
    const userId = req.auth.userId

    const jurisdiction = 'DIVORCE'
    const caseType = 'FinancialRemedyMVP2'
    const eventId = 'FR_approveApplication'

    const eventTokenAndCase = await getEventTokenAndCase(userId, caseId, jurisdiction, caseType, eventId, authHeaders)

    const eventToken = eventTokenAndCase.token
    const caseDetails = eventTokenAndCase.caseDetails

    const directionComments = ''
    // console.log(eventToken);
    // console.log(caseDetails);

    const payload = prepareCaseForApproval(
        eventToken,
        eventId,
        user,
        directionComments
    )

    console.log('payload')
    console.log(payload)

    // console.log(eventToken)
    // console.log(caseDetails)
}

/**
 * getEventTokenAndCase
 *
 * TODO: Not sure if we need both Authorization and ServiceAuthorization on this request.
 * TODO: Error handling passing back meaningful error.
 * TODO: Unit Test
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

/**
 * perpareCaseForApproval
 *
 * TODO: Make DRY with state.js
 * TODO: Unit Test
 * TODO: directionComments used to be store.get(`decisions_${state.inCaseId} store.notesForAdmin
 *
 * @param eventToken
 * @param {String} eventId - 'FR_approveApplication'
 * @param {String} directionComments - the comments that go along with the
 *
 * @return {Object} -
 * {
 *  data:
 *  {
 *  orderDirection: 'Order Accepted as drafted',
 *  orderDirectionDate: '2018-12-03',
 *  orderDirectionJudge: 'District Judge',
 *  orderDirectionJudgeName: 'Nasim Judge '
 *  },
 *  event: { id: 'FR_approveApplication' },
 *  event_token: 'eyJhbG...',
 *  ignore_warning: true
 * }
 */
function prepareCaseForApproval(eventToken, eventId, user, directionComments) {
    return {
        /* eslint-disable-next-line id-blacklist */
        data: {
            orderDirection: 'Order Accepted as drafted',
            orderDirectionDate: moment(new Date()).format('YYYY-MM-DD'),
            orderDirectionJudge: 'District Judge',
            orderDirectionJudgeName: `${user.forename} ${user.surname} `,
            orderDirectionAddComments: directionComments
        },
        event: {
            id: eventId
        },
        event_token: eventToken,

        ignore_warning: true
    }
}

module.exports.getTokenAndMakePayload = getTokenAndMakePayload
module.exports.getEventTokenAndCase = getEventTokenAndCase
module.exports.prepareCaseForApproval = prepareCaseForApproval

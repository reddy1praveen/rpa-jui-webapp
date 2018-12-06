const Store = require('../../../lib/store/store')
const exceptionFormatter = require('exception-formatter')
const config = require('../../../../config/index')
const ccdStore = require('../../../services/ccd-store-api/ccd-store')
const moment = require('moment')
const translateJson = require('./translate')
const log4js = require('log4js')
const headerUtilities = require('../../../lib/utilities/headerUtilities')

const logger = log4js.getLogger('State')
logger.level = config.logging ? config.logging : 'OFF'

const ERROR400 = 400
const exceptionOptions = {
    maxLines: 1
}

function getOptions(req) {
    return headerUtilities.getAuthHeaders(req)
}

function perpareCaseForApproval(caseData, eventToken, eventId, user, store) {
    const payload = {
        /* eslint-disable-next-line id-blacklist */
        data: {
            orderDirection: 'Order Accepted as drafted',
            orderDirectionDate: moment(new Date()).format('YYYY-MM-DD'),
            orderDirectionJudge: 'District Judge',
            orderDirectionJudgeName: `${user.forename} ${user.surname} `,
            orderDirectionAddComments: store.notesForAdmin
        },
        event: {
            id: eventId
        },
        event_token: eventToken,

        ignore_warning: true
    }

    return payload
}

function translate(store, fieldName) {
    if (store[fieldName]) {
        return translateJson.lookup[fieldName]
    }
    return null
}

// function perpareCaseForConsentOrder(documentAnnotationId, eventToken, eventId, user, store) {
//     const payload = {
//         /* eslint-disable-next-line id-blacklist */
//         data: {
//             consentOrder: {
//                 document_url: `${config.services.dm_store_api}/documents/${documentAnnotationId}`,
//                 document_binary_url: `${config.services.dm_store_api}//documents/${documentAnnotationId}/binary`
//             }
//         },
//         event: {
//             id: eventId
//         },
//         event_token: eventToken,

//         ignore_warning: true
//     }

//     return payload
// }

function perpareCaseForRefusal(caseData, eventToken, eventId, user, store) {
    let orderRefusal = []
    let orderRefusalOther = null
    let orderRefusalNotEnough = []
    let orderRefusalNotEnoughOther = null
    let estimateLengthOfHearing = null
    let whenShouldHearingTakePlace = null
    let whereShouldHearingTakePlace = null
    let otherHearingDetails = null

    /* eslint-disable-next-line id-blacklist */

    orderRefusal.push(translate(store, 'orderNotAppearOfS25ca1973'))
    orderRefusal.push(translate(store, 'd81'))
    orderRefusal.push(translate(store, 'pensionAnnex'))
    orderRefusal.push(translate(store, 'applicantTakenAdvice'))
    orderRefusal.push(translate(store, 'respondentTakenAdvice'))

    if (store.partiesNeedAttend) {
        estimateLengthOfHearing = store.estimateLengthOfHearing
        whenShouldHearingTakePlace = store.whenHearingPlaced
        whereShouldHearingTakePlace = translate(store, 'whichCourt')
        otherHearingDetails = store.otherHearingDetails
    }

    if (store.NotEnoughInformation) {
        orderRefusalNotEnough.push(translate(store, 'capitalPositions'))
        orderRefusalNotEnough.push(translate(store, 'partiesHousingNeeds'))
        orderRefusalNotEnough.push(translate(store, 'justificationDeparture'))
        orderRefusalNotEnough.push(translate(store, 'partiesPensionProvision'))
        orderRefusalNotEnough.push(translate(store, 'childrensHousingNeeds'))
        orderRefusalNotEnough.push(translate(store, 'netEffectOrder'))
    }

    orderRefusal = orderRefusal.filter(x => Boolean(x))
    orderRefusalNotEnough = orderRefusalNotEnough.filter(x => Boolean(x))

    if (orderRefusal.length === 0) {
        orderRefusal = null
    }

    if (orderRefusalNotEnough.length === 0) {
        orderRefusalNotEnough = null
    }

    if (store.other) {
        orderRefusalNotEnoughOther = translate(store, 'informationNeeded')
    }

    if (store.other2) {
        orderRefusalOther = translate(store, 'Reason')
    }

    const orderRefusalCollection = {
        orderRefusalDate: moment(new Date()).format('YYYY-MM-DD'),
        orderRefusalJudge: 'District Judge',
        orderRefusalJudgeName: `${user.forename} ${user.surname} `,
        orderRefusalAddComments: store.notesForAdmin
    }

    const checkList = {
        orderRefusal,
        orderRefusalOther,
        orderRefusalNotEnough,
        orderRefusalNotEnoughOther,
        estimateLengthOfHearing,
        whenShouldHearingTakePlace,
        whereShouldHearingTakePlace,
        otherHearingDetails
    }

    Object.entries(checkList).forEach(keyValue => {
        logger.info('checking ', keyValue[0], ' with', keyValue[1])
        if (keyValue[1]) {
            orderRefusalCollection[keyValue[0]] = keyValue[1]
        }
    })

    const documentAnnotationId = store.documentAnnotationId

    orderRefusalCollection.orderRefusalDocs = {
        document_url: `${config.services.dm_store_api}/documents/${documentAnnotationId}`,
        document_binary_url: `${config.services.dm_store_api}/documents/${documentAnnotationId}/binary`
    }
    const payload = {
        /* eslint-disable-next-line id-blacklist */
        data: {
            orderRefusalCollection
        },
        event: {
            id: eventId
        },
        event_token: eventToken,

        ignore_warning: true
    }

    return payload
}

async function makeDecision(decision, req, state, store) {
    let payload = {}
    let eventToken = {}
    let caseDetails = {}

    try {
        logger.info('Getting Event Token')

        const event = decision === 'yes' ? 'FR_approveApplication' : 'FR_orderRefusal'

        const eventTokenAndCAse = await ccdStore.getEventTokenAndCase(
            req.auth.userId,
            'DIVORCE',
            'FinancialRemedyMVP2',
            state.inCaseId,
            event,
            getOptions(req)
        )

        eventToken = eventTokenAndCAse.token
        caseDetails = eventTokenAndCAse.caseDetails

        logger.info(`Got token ${eventToken}`)
    } catch (exception) {
        logger.error('Error getting event token', exceptionFormatter(exception, exceptionOptions))
        return false
    }

    if (decision === 'yes') {
        payload = perpareCaseForApproval(
            caseDetails,
            eventToken,
            'FR_approveApplication',
            req.session.user,
            store.get(`decisions_${state.inCaseId}`)
        )
    }

    if (decision === 'no') {
        payload = perpareCaseForRefusal(
            caseDetails,
            eventToken,
            'FR_orderRefusal',
            req.session.user,
            store.get(`decisions_${state.inCaseId}`)
        )
    }

    try {
        logger.info('Payload assembled')
        logger.info(JSON.stringify(payload))
        await ccdStore.postCaseWithEventToken(
            req.auth.userId,
            'DIVORCE',
            'FinancialRemedyMVP2',
            state.inCaseId,
            payload,
            getOptions(req)
        )

        return true
    } catch (exception) {
        logger.error('Error sending event', exceptionFormatter(exception, exceptionOptions))
        return false
    }
}

async function payload(res, req) {
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

    logger.info('Posting to CCD')
    let result = false
    result = await makeDecision(store.get(`decisions_${caseId}`).approveDraftConsent, req, state, store)

    logger.info('Posted to CCD', result)

    if (result) {
        return 'decision-confirmation'
    }

    res.status(ERROR400)
    res.send('Error updating case')
    return null
}

module.exports = { payload }

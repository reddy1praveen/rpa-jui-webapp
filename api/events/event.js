const express = require('express');
const moment = require('moment');
const getEventTemplate = require('./templates');
const valueProcessor = require('../lib/processors/value-processor');

const { getCCDEvents } = require('../services/ccd-store-api/ccd-store');
const { getHearingIdOrCreateHearing, getOnlineHearingConversation } = require('../services/coh-cor-api/coh-cor-api');

function hasCOR(jurisdiction, caseType) {
    return jurisdiction === 'SSCS';
}

function convertDateTime(dateObj) {
    const conDateTime = moment(dateObj);
    const dateUtc = conDateTime.utc().format();
    const date = conDateTime.format('D MMMM YYYY');
    const time = conDateTime.format('h:mma');

    return {
        dateUtc,
        date,
        time
    };
}

//////////////////////////
/// CCD EVENT Data
//////////////////////////

function reduceCcdEvents(events, caseId, jurisdiction, caseType) {
    return events.map(event => {
        const dateObj = convertDateTime(event.created_date);
        const dateUtc = dateObj.dateUtc;
        const date = dateObj.date;
        const time = dateObj.time;

        valueProcessor(getEventTemplate(jurisdiction, caseType), event);

        const documents = event.documents.map(doc => {
            return ({
                name: `${doc.document_filename}`,
                href: `/case/${jurisdiction}/${caseType}/${caseId}/casefile/${doc.id}`
            });
        });


        return {
            title: event.event_name,
            by: `${event.user_first_name} ${event.user_last_name}`,
            dateUtc,
            date,
            time
            // ,documents // renable when we want to actuall show documents
        };
    });
}

function getCcdEvents(caseId, userId, jurisdiction, caseType, options) {
    return getCCDEvents(caseId, userId, jurisdiction, caseType, options).then(events => reduceCcdEvents(events, caseId, jurisdiction, caseType));
}

//////////////////////////
/// COH EVENT Data
//////////////////////////

function getHistory(arrObject) {
    return arrObject.map(arr => arr.history)
        .reduce((history, item) => history.concat(item), []);
}

function mergeCohEvents(eventsJson) {
    const history = eventsJson.online_hearing.history;
    const questionHistory = eventsJson.online_hearing.questions ? getHistory(eventsJson.online_hearing.questions) : [];
    const answersHistory = eventsJson.online_hearing.answers ? getHistory(eventsJson.online_hearing.answers) : [];
    const decisionHistory = eventsJson.online_hearing.decision ? eventsJson.online_hearing.decision.history : [];
    return [...history, ...questionHistory, ...answersHistory, ...decisionHistory];
}

function reduceCohEvents(events) {
    return events.map(event => {
        const dateObj = convertDateTime(event.state_datetime);
        const dateUtc = dateObj.dateUtc;
        const date = dateObj.date;
        const time = dateObj.time;

        return {
            title: event.state_desc,
            by: 'coh',
            dateUtc,
            date,
            time,
            documents: []
        };
    });
}

function getCohEvents(caseId, userId, options) {
    return getHearingIdOrCreateHearing(caseId, userId, options)
        .then(hearingId => getOnlineHearingConversation(hearingId, options)
            .then(mergeCohEvents)
            .then(reduceCohEvents)
        );
}

//////////////////////////
/// Event Functions
//////////////////////////

function combineLists(lists) {
    return [].concat(...lists);
}

function sortEvents(events) {
    return events.sort((result1, result2) => moment.duration(moment(result2.dateUtc).diff(moment(result1.dateUtc))).asMilliseconds());
}

function getEvents(userId, jurisdiction, caseType, caseId, options) {
    const promiseArray = [];
    promiseArray.push(getCcdEvents(caseId, userId, jurisdiction, caseType, options));
    if (hasCOR(jurisdiction, caseType)) {
        promiseArray.push(getCohEvents(caseId, userId, options));
    }
    return Promise.all(promiseArray)
        .then(combineLists)
        .then(sortEvents);
}

function getOptions(req) {
    return {
        headers: {
            Authorization: `Bearer ${req.auth.token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization
        }
    };
}

module.exports = app => {
    const router = express.Router({ mergeParams: true });
    app.use('/case', router);

    router.get('/:jur/:casetype/:case_id/events', (req, res, next) => {
        const userId = req.auth.userId;
        const caseId = req.params.case_id;
        const jurisdiction = req.params.jur;
        const caseType = req.params.casetype;

        getEvents(caseId, userId, jurisdiction, caseType, getOptions(req))
            .then(events => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('content-type', 'application/json');
                res.status(200).send(JSON.stringify(events));
            });
    });

    router.get('/:jur/:casetype/:case_id/events/raw', (req, res, next) => {
        const userId = req.auth.userId;
        const caseId = req.params.case_id;
        const jurisdiction = req.params.jur;
        const caseType = req.params.casetype;

        getCCDEvents(caseId, userId, jurisdiction, caseType, getOptions(req))
            .then(events => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('content-type', 'application/json');
                res.status(200).send(JSON.stringify(events));
            });
    });
};

module.exports.getEvents = getEvents;

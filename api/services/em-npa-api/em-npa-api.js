const express = require('express');
const config = require('../../../config');
const generateRequest = require('../../lib/request/request');
const headerUtilities = require('../../utilities/headerUtilities')

const url = config.services.em_npa_api;

function createNpaTask(options) {
    return generateRequest('POST', `${url}/api/document-tasks`, options);
}

function getOptions(req) {
    return headerUtilities.getAuthHeaders(req)
}

module.exports = app => {
    const router = express.Router({ mergeParams: true });
    app.use('/em-npa', router);

    router.post('/document-tasks', (req, res, next) => {
        const options = getOptions(req);

        createNpaTask(options)
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('content-type', 'application/json');
                res.status(200).send(JSON.stringify(response));
            })
            .catch(response => {
                res.status(response.error.status).send(response.error.message);
            });
    });
};

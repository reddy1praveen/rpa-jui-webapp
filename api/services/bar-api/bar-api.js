const express = require('express');
const config = require('../../../config');
const generateRequest = require('../../lib/request/request');
const headerUtilities = require('../../utilities/headerUtilities')

const url = config.services.bar_api;

function getHealth(options) {
    return generateRequest('GET', `${url}/health`, options);
}

function getInfo(options) {
    return generateRequest('GET', `${url}/info`, options);
}

function getOptions(req) {
    return headerUtilities.getAuthHeaders(req);
}

module.exports = app => {
    const router = express.Router({ mergeParams: true });
    app.use('/bar', router);

    router.get('/health', (req, res, next) => {
        getHealth(getOptions(req)).pipe(res);
    });

    router.get('/info', (req, res, next) => {
        getInfo(getOptions(req)).pipe(res);
    });
};

module.exports.getInfo = getInfo;
module.exports.getHealth = getHealth;

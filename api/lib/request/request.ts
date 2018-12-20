import {config} from '../../../config'
const proxy = require('./proxy')
const request = require('request-promise')

/**
 * TODO: Requires Unit tests as this is used everywhere to make requests to 3rd party
 * services.
 */

//** actually - replace with axios - AJ

module.exports = (method, url, params) => {
    const headers = params.headers && config.configEnv !== 'mock' ? Object.assign(params.headers) : {}

    let options = {
        body: '',
        formData: '',
        headers: {
            ...headers,
            'Content-Type': params.headers['Content-Type'] || 'application/json',
        },
        json: true,
        method,
        url,
    }

    if (params.body) {
        options.body = params.body
    }
    if (params.formData) {
        options.formData = params.formData
    }

    // if (config.configEnv !== 'mock') {
    //     if (config.useProxy) options = proxy(options)
    // }
    // N.B. Not needed - AJ

    console.log('Make request with options')
    console.log(options)
    return request(options)
}

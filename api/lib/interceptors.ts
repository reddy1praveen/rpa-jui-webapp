import * as log4js from 'log4js'
import { config } from '../../config'
import { shorten, valueOrNull } from '../lib/util'

export function requestInterceptor(request) {
    const logger = log4js.getLogger('outgoing')
    logger.level = config.logging

    const url = shorten(request.url, config.maxLogLine)
    logger.info(`${request.method.toUpperCase()} to ${url}`)

    return request
}

export function successInterceptor(response) {
    const logger = log4js.getLogger('return')
    logger.level = config.logging

    const url = shorten(response.config.url, config.maxLogLine)

    logger.info(`Success on ${response.config.method.toUpperCase()} to ${url}`)
    console.log(response.headers)
    return response
}

export function errorInterceptor(response) {
    const logger = log4js.getLogger('return')
    logger.level = config.logging

    const url = shorten(response.config.url, config.maxLogLine)

    const error = valueOrNull(response, 'response.status') ? response.response.status : Error(response).message
    const data = valueOrNull(response, 'response.status') ? JSON.stringify(response.response.data, null, 2) : null

    logger.error(`Error on ${response.config.method.toUpperCase()} to ${url} (${error}) \n ${data}`)

    return Promise.reject(response)
}

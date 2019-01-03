import * as express from 'express'
import {config} from '../../../config'
import { http } from '../../lib/http'

const generateRequest = require('../../lib/request/request')
const headerUtilities = require('../../lib/utilities/headerUtilities')

const url = config.services.idam_api
const idamSecret = process.env.IDAM_SECRET || 'AAAAAAAAAAAAAAAA'
const idamClient = config.idam_client
const idamProtocol = config.protocol
const oauthCallbackUrl = config.oauth_callback_url

export async function getDetails() {
    const response = await http.get(`${url}/details`)
    return response.data
}

export async function postOauthToken(code, host) {
    const redirectUri = `${idamProtocol}://${host}/${oauthCallbackUrl}`
    const urlX = `${url}/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`

    const response = await http.post(`${urlX}`, {}, {
        headers: {
            Authorization: `Basic ${Buffer.from(`${idamClient}:${idamSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })

    return response.data
}

export async function getHealth() {
    const response = await http.get(`${url}/health`)

    return response.data
}

export async function getInfo() {
    const response = await http.get(`${url}/info`)

    return response.data
}

export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/idam', router)

    router.get('/health', async (req, res, next) => {
        res.status(200)
        res.send(await getHealth())
    })

    router.get('/info', async (req, res, next) => {
        res.status(200)
        res.send(await getInfo())
    })

    router.get('/details', async (req, res, next) => {
        res.status(200)
        res.send(await getDetails())
    })
}

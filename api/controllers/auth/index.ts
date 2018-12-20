import * as express from 'express'
import { config } from '../../../config/index'

const { getDetails, postOauthToken } = require('../../services/idam-api/idam-api')

const cookieToken = config.cookies.token
const cookieUserId = config.cookies.userId

const test = true

export function logout(req, res) {
    res.clearCookie(cookieToken)
    res.clearCookie(cookieUserId)
    res.redirect(req.query.redirect || '/')
}

export async function authenticateUser(req: any, res) {
    const data = await asyncReturnOrError(
        postOauthToken(req.query.code, req.get('host')),
        'Error getting token for code',
        res,
        logger,
        false,
    )

    if (exists(data, 'access_token')) {
        const options = { headers: { Authorization: `Bearer ${data.access_token}` } }

        const details = await asyncReturnOrError(getDetails(options), 'Cannot get user details', res, logger, false)

        if (details) {
            req.session.user = details
            res.cookie(cookieToken, data.access_token)
            res.cookie(cookieUserId, details.id)
        }
    }

    res.redirect('/')
}

export function auth(app) {
    const router = express.Router()

    app.use('/oauth2/callback', router)

    router.use(authenticateUser)

    app.use('/logout', logout)
}

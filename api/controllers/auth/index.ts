import * as express from 'express'
import { config } from '../../../config/index'

import { getDetails, postOauthToken } from '../../services/idam-api/idam-api'

const cookieToken = config.cookies.token
const cookieUserId = config.cookies.userId

const test = true

export function logout(req, res) {
    res.clearCookie(cookieToken)
    res.clearCookie(cookieUserId)
    res.redirect(req.query.redirect || '/')
}

export function authFn(req: any, res, next) {
    postOauthToken(req.query.code, req.get('host'))
        .then(data => {
            if (data.access_token) {
                const options = { headers: { Authorization: `Bearer ${data.access_token}` } }
                getDetails(options).then(details => {
                    req.session.user = details
                    res.cookie(cookieToken, data.access_token)
                    res.cookie(cookieUserId, details.id)
                    res.redirect('/')
                })
            }
        })
        .catch(e => {
            console.log('error - ', e)
            res.redirect('/')
        })
}

export function auth(app) {
    const router = express.Router()

    app.use('/oauth2/callback', router)

    router.use(authFn)

    app.use('/logout', logout)
}

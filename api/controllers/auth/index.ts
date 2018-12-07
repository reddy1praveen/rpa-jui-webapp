import * as express from 'express'
import { config } from '../../../config/index'
import log4js = require('log4js');
const { getDetails, postOauthToken } = require('../../services/idam-api/idam-api')

const cookieToken = config.cookies.token
const cookieUserId = config.cookies.userId



module.exports = app => {
    const router = express.Router()
    const logger = log4js.getLogger('Auth')

    app.use('/oauth2/callback', router)

    router.use((req: any, res, next) => {
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
                logger.error('auth error ', e);
                res.redirect('/')
            })
    })

    app.use('/logout', (req, res, next) => {
        res.clearCookie(cookieToken)
        res.clearCookie(cookieUserId)
        logger.info('clear cookie - user logout')
        res.redirect(req.query.redirect || '/')
    })
}

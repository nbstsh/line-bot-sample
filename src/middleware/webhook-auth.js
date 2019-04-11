const crypto = require('crypto')
const logger = require('../log/logger')

const CHANNEL_SECRET = process.env.LINE_BOT_SAMPLE_CHANNEL_SECRET
// TODO error handling
if (!CHANNEL_SECRET) {
    throw new Error('FATAL ERROR: LINE_BOT_SAMPLE_CHANNEL_SECRET is not difined.')
}

const auth = (req, res, next) => {
    const xLineSignature = req.header('X-Line-Signature')
    if (!xLineSignature) return res.status(401).send('Access denied. No X-Line-Signature provided.')

    const signature = crypto
        .createHmac('SHA256', CHANNEL_SECRET)
        .update(JSON.stringify(req.body)).digest('base64');

    // log
    logger.info('[X-Line-Signature] ' + xLineSignature)
    logger.info('[body] ' + JSON.stringify(req.body))
    logger.info('[signature] ' + signature)

    // Compare X-Line-Signature request header and the signature
    if (signature === xLineSignature) {
        next()
    }  else {
        res.status(400).send('Invalid request.')
    }
}


module.exports = auth
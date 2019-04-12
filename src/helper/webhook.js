const rp = require('request-promise')


const CHANNEL_ACCESS_TOKEN = process.env.LINE_BOT_SAMPLE_CHANNEL_ACCESS_TOKEN

if (!CHANNEL_ACCESS_TOKEN) {
    throw new Errror('FATAL ERROR: LINE_BOT_SAMPLE_CHANNEL_ACCESS_TOKEN is not defined.')
}

const REPLY_ENDPOINT = 'https://api.line.me/v2/bot/message/reply'


const reply = async (replyToken, messages) => {
    const options = {
        method: 'POST',
        uri: REPLY_ENDPOINT,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
        },
        body: {
            replyToken,
            messages
        },
        json: true // Automatically stringifies the body to JSON
    }

    await rp(options)
}


module.exports = { reply }
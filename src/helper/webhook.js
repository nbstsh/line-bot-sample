const rp = require('request-promise')
const { middleware, Client, SignatureValidationFailed, JSONParseError } = require('@line/bot-sdk')

const config = {
    channelAccessToken: process.env.LINE_BOT_SAMPLE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_BOT_SAMPLE_CHANNEL_SECRET
};

const client = new Client(config);


module.exports = {
    client,

    middleware: middleware(config),

    handleEvent(event) {
        if (event.type !== 'message' || event.message.type !== 'text') {
            return Promise.resolve(null);
        }
          
        return client.replyMessage(event.replyToken, {
            type: 'text',
            text: event.message.text
        })
    },

    handleError(err, req, res, next){
        if (err instanceof SignatureValidationFailed) {
          res.status(401).send(err.signature)
          return
        } else if (err instanceof JSONParseError) {
          res.status(400).send(err.raw)
          return
        }
        next(err) // will throw default 500
    },

}





////////////////////////////////////////////////////////////////////// Withou using linebot sdk

// const REPLY_ENDPOINT = 'https://api.line.me/v2/bot/message/reply'

// const reply = async (replyToken, messages) => {
//     const options = {
//         method: 'POST',
//         uri: REPLY_ENDPOINT,
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
//         },
//         body: {
//             replyToken,
//             messages
//         },
//         json: true // Automatically stringifies the body to JSON
//     }

//     await rp(options)
// }


// module.exports = { reply }
const express = require('express')
const app = express()
const logger = require('./log/logger')
const fs = require('fs')

const webhookAuth = require('./middleware/webhook-auth')
const { addMessage, loadMessages } = require('./message/message')

app.use(express.json())


// TODO error handling
process.on('unhandledRejection', (ex) => {
    console.log(ex)
})
process.on('uncaughtException', (ex) => {
    console.log(ex)
})

app.get('/', (req, res) => {
    res.send('Weolcome to line bot sample!!!')
})


app.get('/logs', (req, res) => {
    fs.readFile('logs/combined.log', (err, data) => {
        if (err)  return res.status(500).send(err)

        const dataStrArray = data.toString().split('\n')
        dataStrArray.pop()
        const dataJsonArray = dataStrArray.map(str => JSON.parse(str))

        res.send(dataJsonArray)
    })
})


app.post('/webhook', webhookAuth, (req, res) => {
    const { events } = req.body

    events.forEach(({ source, type, message }) => {
        if (type !== 'message' && message.type !== 'text') return 

        addMessage({
            userId: source.userId,
            text: message.text
        })
    })

    res.send()
})

app.get('/messages', (req, res) => {
    res.send(loadMessages())
})

app.post('/messages', (req, res) => {
    const { userId, text } = req.body

    if (!userId || !text) return res.status(400).send('Invalid request.')

    const message = { userId, text }
    addMessage(message)

    res.send(message)
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => logger.info(`Start listening on port ${PORT}...`))

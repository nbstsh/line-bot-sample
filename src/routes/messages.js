const express = require('express')
const router = express.Router()
const { addMessage, loadMessages } = require('../message/message')
const { client } = require('../helper/webhook')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.send(loadMessages())
})

router.post('/', (req, res) => {
    const { userId, text } = req.body

    if (!userId || !text) return res.status(400).send('Invalid request.')

    const message = { userId, text }
    addMessage(message)

    res.send(message)
})


router.post('/pushMessages', async (req, res)  => {
    const { receiverId, messages, password } = req.body 
    const isMatch = await bcrypt.compare(process.env.LINE_BOT_SAMPLE_PASSWORD, password)
    if (!isMatch) {
        return res.status(401).send()
    }

    client.pushMessage(receiverId, messages)
    res.send(messages)
})


module.exports = router 
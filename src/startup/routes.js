const express = require('express')
const webhook = require('../routes/webhook')
const messages = require('../routes/messages')
const logs = require('../routes/logs')
const error = require('../middleware/error')

module.exports = (app) => {
    app.use('/webhook', webhook)// This needs to be before body parser
    app.use(express.json())
    app.use('/messages', messages)
    app.use('/logs', logs)
    app.use(error)
}


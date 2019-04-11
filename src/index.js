const express = require('express')
const app = express()
const logger = require('./log/logger')



app.get('/', (req, res) => {
    res.send('Weolcome to line bot sample!!!')
})

app.post('/webhook', (req, res) => {
    logger.info('post /webhook')

    res.send('webhook')
})



const PORT = process.env.PORT || 3000
app.listen(PORT, () => logger.info(`Start listening on port ${PORT}...`))
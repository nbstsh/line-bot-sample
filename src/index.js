const express = require('express')
const app = express()
const logger = require('./log/logger')
const fs = require('fs')


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


app.post('/webhook', (req, res) => {

    res.send('webhook')
})



const PORT = process.env.PORT || 3000
app.listen(PORT, () => logger.info(`Start listening on port ${PORT}...`))
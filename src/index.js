const express = require('express')
const app = express()



app.get('/', (req, res) => {
    res.send('Weolcome to line bot sample!!!')
})

app.post('/webhook', (req, res) => {
    console.log('post /webhook')

    res.send('webhook')
})



const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Start listening on port ${PORT}...`))
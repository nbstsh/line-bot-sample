const rp = require('request-promise')


const url = 'https://nbstsh-linebot-sample.herokuapp.com/messages'

const main = async () => {
    const res = await rp(url)
    console.log(res)

    const options = {
        method: 'POST',
        uri: url,
        body: {
            userId: 'sampleid',
            text: 'text from request promise'
        },
        json: true // Automatically stringifies the body to JSON
    }

    const res2 = await rp(options)
    console.log(res2)
}

main()
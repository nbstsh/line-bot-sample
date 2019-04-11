const fs = require('fs')

const addMessage = async (message) => {
    const messages = loadMessages()
    messages.push(message)
    saveMessages(messages)
}

const loadMessages = () => {
    try {
        const  dataBuffer = fs.readFileSync('messages.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
   
}

const saveMessages = (messages) => {
    const dataJSON = JSON.stringify(messages)
    fs.writeFileSync('messages.json', dataJSON)
}

module.exports = {
    addMessage,
    loadMessages
}


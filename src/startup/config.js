
if (!process.env.LINE_BOT_SAMPLE_CHANNEL_ACCESS_TOKEN) {
    throw new Errror('FATAL ERROR: LINE_BOT_SAMPLE_CHANNEL_ACCESS_TOKEN is not defined.')
}

if (!process.env.LINE_BOT_SAMPLE_CHANNEL_SECRET) {
    throw new Error('FATAL ERROR: LINE_BOT_SAMPLE_CHANNEL_SECRET is not difined.')
}

if (!process.env.LINE_BOT_SAMPLE_PASSWORD) {
    throw new Error('FATAL ERROR: LINE_BOT_SAMPLE_PASSWORD is not defined.')
}
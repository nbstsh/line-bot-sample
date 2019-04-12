const express = require('express')
const router = express.Router()
const { middleware, handleEvent, handleError } = require('../helper/webhook')

router.use(middleware)

router.post('', (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
})

router.use(handleError)

module.exports = router
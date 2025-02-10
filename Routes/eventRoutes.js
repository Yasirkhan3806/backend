const express = require('express')
const router = express.Router()
const eventControllers = require('../Controllers/eventControllers')
const {authenticate} = require('../Middleware/authMiddleWare')

router.post('/store-event-data',authenticate,eventControllers.storeEventData)


module.exports = router
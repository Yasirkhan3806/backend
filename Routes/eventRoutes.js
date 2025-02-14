const express = require('express')
const router = express.Router()
const eventControllers = require('../Controllers/eventControllers')
const {authenticate} = require('../Middleware/authMiddleWare')

router.post('/store-event-data',authenticate,eventControllers.storeEventData)
router.get('/get-event-data',authenticate,eventControllers.getEventData)


module.exports =(io)=>{
return router
} 
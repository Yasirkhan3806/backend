const express = require('express');
const router = express.Router();
const { authenticate } = require('../Middleware/authMiddleWare');

//  Export a function that takes `io`
module.exports = (io) => {
  const eventControllers = require('../Controllers/eventControllers')(io); 

  router.post('/store-event-data', authenticate, eventControllers.storeEventData);
  router.get('/get-event-data', authenticate, eventControllers.getEventData);

  return router; // Router is returned
};

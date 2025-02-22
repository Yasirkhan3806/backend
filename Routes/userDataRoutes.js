const express = require('express');
const router = express.Router();
const { authenticate } = require('../Middleware/authMiddleWare');




module.exports = (io)=>{
    const userDataController = require('../Controllers/userDataController')(io);
    router.get('/get-user-data', authenticate, userDataController.getUser);
    router.get('/set-user-name', authenticate, userDataController.updateUser);
    return router;  // Router is returned
}
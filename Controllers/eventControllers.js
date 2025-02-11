const eventService = require('../Services/eventService')

exports.storeEventData = async(req,res)=>{
    const response = await eventService.createEvent(req.body, req.user.email);
    res.status(response.success ? 200 : 500).json(response);
}


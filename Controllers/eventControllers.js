const createEvent = require('../Services/eventService')

exports.storeEventData = async(req,res)=>{
    const response = await createEvent(req.body, req.user.id);
    res.status(response.success ? 200 : 500).json(response);
}


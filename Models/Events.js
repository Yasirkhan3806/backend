const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    eventData: {type: Array, require: true},
    // endTime: {type:String ,require: true},
    // startTime : {type: String,require: true},
    // eventDate : {type:String, require: true},
    // eventName : {type:String, require: true},
    // eventNotes : {type:String, require: true},
    userEmail : {type:String, require: true, unique: true },
},{collection:'EventsData'})

module.exports = mongoose.model("Events", eventSchema);
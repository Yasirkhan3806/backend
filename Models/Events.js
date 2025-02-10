const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    endTime: {type:String ,require: true},
    startTime : {type: String,require: true},
    eventDate : {type:String, require: true},
    eventName : {type:String, require: true},
    eventNotes : {type:String, require: true},
    userId : {type:String, require: true, unique: true },
},{collection:'EventsData'})

module.exports = mongoose.model("Events", eventSchema);
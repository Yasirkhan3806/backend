const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    eventData: {type: Array, require: true},
    userEmail : {type:String, require: true, unique: true },
},{collection:'EventsData'})

module.exports = mongoose.model("Events", eventSchema);
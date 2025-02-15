const Events = require("../Models/Events");

module.exports =(io) =>{ return {
  createEvent: async(eventData, userEmail) =>{
    const { endTime, startTime, eventDate, eventName, eventNotes } = eventData;

    try {
      // Use findOneAndUpdate with upsert to handle both insert and update in one operation
      const result = await Events.findOneAndUpdate(
        { userEmail:userEmail  }, // Filter by userId
        {
          $push: {
            eventData: {
              endTime: endTime,
              startTime: startTime,
              eventDate: eventDate,
              eventName: eventName,
              eventNotes: eventNotes,
            },
          },
        },
        {
          upsert: true, // Create a new document if it doesn't exist
          new: true, // Return the updated document
        }
      );
  
      return {
        success: true,
        message: "Event successfully stored",
        event: result, // Return the updated or newly created document
      };
    } catch (error) {
      console.error("Error creating event:", error); // Log for debugging
  
      return {
        success: false,
        message: "Failed to store event",
        error: error.message, // Return only the error message
      };
    }
  },

  getEvent: async(email) =>{
    const event = await Events.findOne({userEmail:email})
    if(!event) throw new error('No Event Registered, Please register an event')
    console.log(event)
  }
} };
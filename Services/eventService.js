const Events = require("../Models/Events");

module.exports = (io) => {
  return {
    /**
     * @function createEvent
     * @description Stores or updates an event for a user and notifies them via WebSockets.
     * @param {Object} eventData - The event details (startTime, endTime, etc.).
     * @param {string} userEmail - The email of the user creating the event.
     * @returns {Object} - Response object containing success status and event data.
     */
    createEvent: async (eventData, userEmail) => {
      const { endTime, startTime, eventDate, eventName, eventNotes } = eventData;

      try {
        // 🔹 Find the user by email and push the new event into their eventData array
        const result = await Events.findOneAndUpdate(
          { userEmail: userEmail }, // Filter by user email
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
            upsert: true, // 🔹 Create a new document if the user doesn't have events yet
            new: true, // 🔹 Return the updated document
          }
        );

        // 🔹 Notify the user via Socket.IO that their event data has been updated
        io.to(userEmail).emit("eventUpdated", { success: true });

        return {
          success: true,
          message: "Event successfully stored",
          event: result, // Return the updated or newly created event
        };
      } catch (error) {
        console.error("Error creating event:", error);

        return {
          success: false,
          message: "Failed to store event",
          error: error.message,
        };
      }
    },

    /**
     * @function getEvent
     * @description Retrieves all events associated with a given user email.
     * @param {string} email - The email of the user requesting event data.
     * @returns {Array} - The list of stored events.
     * @throws {Error} - If no events are found.
     */
    getEvent: async (email) => {
      const event = await Events.findOne({ userEmail: email });
        console.log(event)
      if (!event) throw new Error("No Event Registered, Please register an event");

      return event.eventData;
    },
  };
};

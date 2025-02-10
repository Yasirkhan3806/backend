const Events = require("../Models/Events");

// A function that stores an event in the database using userId
exports.createEvent = async (eventData, userId) => {
  const { endTime, startTime, eventDate, eventName, eventNotes } = eventData;

  try {
    const event = new Events({
      endTime,
      startTime,
      eventDate,
      eventName,
      eventNotes,
      userId, // Ensure userId is properly attached
    });

    await event.save(); // ✅ Wait for the database operation to complete

    return {
      success: true,
      message: "Event successfully stored",
      event, // Optional: Return the stored event object
    };
  } catch (error) {
    console.error("Error creating event:", error); // ✅ Log for debugging

    return {
      success: false,
      message: "Failed to store event",
      error: error.message, // ✅ Return only the error message
    };
  }
};


module.exports = (io) => {
  const eventService = require("../Services/eventService")(io);
  return {
    storeEventData: async (req, res) => {
      const response = await eventService.createEvent(req.body, req.user.email);
      res.status(response.success ? 200 : 500).json(response);
    },
    getEventData: async (req, res) => {
      try {
        const response = await eventService.getEvent(req.user.email);
        res.status(201).json({ eventData: response });
      } catch (error) {
        res.status(401).json({ message: error.message });
      }
    },
  };
};

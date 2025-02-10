const express = require('express');
const authRoutes = require('./Routes/authRoutes');
const eventRoutes = require('./Routes/eventRoutes');
const app = express();
app.use(express.json())


app.use("/auth",authRoutes)
app.use("/create-event",eventRoutes)

module.exports = app
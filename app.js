const express = require('express');
const authRoutes = require('./Routes/authRoutes');
const app = express();
app.use(express.json())


app.use("/auth",authRoutes)

module.exports = app
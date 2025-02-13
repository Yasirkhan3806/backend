const express = require('express');
const authRoutes = require('./Routes/authRoutes');
const eventRoutes = require('./Routes/eventRoutes');
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}));

app.use(cookieParser())
app.use(express.json())


app.use("/auth",authRoutes)
app.use("/create-event",eventRoutes)

module.exports = app
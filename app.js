const express = require('express');
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server,{
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
})
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser())
app.use(express.json())

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Send a message to the connected client
    socket.emit("message", "Hello from the server!");

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

const authRoutes = require('./Routes/authRoutes');
const eventRoutes = require('./Routes/eventRoutes')(io);


app.use("/auth",authRoutes)
app.use("/create-event",eventRoutes)

module.exports = server
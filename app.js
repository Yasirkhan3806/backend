const express = require('express');
const app = express();
const authenticateSocket = require('./Middleware/socketAuth')
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

io.use(authenticateSocket);

io.on("connection", (socket) => {
    console.log("A user connected:");


    socket.on("join-room", () => {
        socket.join(socket.user.email); // 
        console.log(`User with ${socket.user.email} has joined the room`);
      });

    socket.on("nameUpdated", () => {
        console.log("Name Updated")
    })

    // Send a message to the connected client
    socket.emit("message", "Hello from the server!");

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

const authRoutes = require('./Routes/authRoutes');
const userDataRoutes = require('./Routes/userDataRoutes')(io);
const eventRoutes = require('./Routes/eventRoutes')(io);


app.use("/auth",authRoutes)
app.use("/create-event",eventRoutes)
app.use("/user-data",userDataRoutes)

module.exports = server
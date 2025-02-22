const jwt = require("jsonwebtoken");
const cookie = require("cookie"); // To parse cookies
const dotenv = require('dotenv')
dotenv.config()
const authenticateSocket = (socket, next) => {
  try {
    // Parse cookies from the handshake headers
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");

    // Extract token from cookies
    const token = cookies.accessToken; 

    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Attach user info to the socket
    socket.user = decoded;
    next(); // Move to the next middleware
  } catch (error) {
    console.error("Socket authentication failed:", error);
    next(new Error("Authentication failed"));
  }
};

module.exports = authenticateSocket;
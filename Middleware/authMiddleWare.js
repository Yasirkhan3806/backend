const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
dotenv.config()

const authenticate = (req, res, next) => {
const token = req.cookies.accessToken
if (!token) {
  return res.status(401).json({ message: 'Unauthorized' });
}
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; // Attach user data (e.g., userId) to req.user
    next(); // Continue to the next middleware/controller
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" }); // 403 Forbidden for invalid tokens
  }
};

module.exports = {authenticate}

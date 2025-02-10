const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Received Token:", authHeader); // Debugging line
  // Check if token exists and follows the correct format
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Access denied. No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer "

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data (e.g., userId) to req.user
    next(); // Continue to the next middleware/controller
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" }); // 403 Forbidden for invalid tokens
  }
};

module.exports = {authenticate}

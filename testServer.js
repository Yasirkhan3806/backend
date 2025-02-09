// Import required libraries
const bcrypt = require("bcrypt"); // Library for password hashing
const jwt = require("jsonwebtoken"); // Library for creating and verifying JWT tokens
const express = require("express"); // Express framework for handling routes
const dotenv = require("dotenv"); // Library for loading environment variables

const app = express(); // Initialize Express application
app.use(express.json()); // Middleware to parse incoming JSON request bodies
dotenv.config(); // Load environment variables from the .env file

// Sample users data (simulating a database)
const usersData = [
  { "name": "Yasir Khan", "data": "I am Yasir Khan's data" },
  { "name": "Shahab Khan", "data": "I am Shahab Khan's data" },
];

/**
 * Middleware: authenticateToken
 * This function verifies the JWT token sent in the Authorization header.
 * If the token is valid, it extracts the user data and allows access to protected routes.
 */
function authenticateToken(req, res, next) {
  // Get the Authorization header from the request
  const authHeader = req.headers["authorization"];
  
  // If no Authorization header is provided, return a 403 Forbidden status
  if (!authHeader) return res.sendStatus(403);

  // The token is usually sent as "Bearer <TOKEN>". We need to extract the actual token.
  const token = authHeader.split(" ")[1];

  // If no token is present after "Bearer", return 403 Forbidden
  if (!token) return res.sendStatus(403);

  // Verify the JWT token using the secret key stored in the environment variable
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // If the token is invalid, return 403 Forbidden

    // Attach the user information from the token to the request object
    req.user = user;

    // Call next() to pass control to the next middleware or route handler
    next();
  });
}

/**
 * GET /userData
 * This route is protected by the authenticateToken middleware.
 * It returns data related to the authenticated user.
 */
app.get("/userData", authenticateToken, (req, res) => {
  // Filter the user data based on the name stored in the JWT token
  const currentUserData = usersData.filter((u) => u.name === req.user.name);

  // Respond with the user-specific data
  res.json(currentUserData);
});

/**
 * POST /login
 * This route allows users to log in and receive a JWT token.
 * The token can be used for authentication in subsequent requests.
 */
app.post("/login", (req, res) => {
  // Extract the user's name from the request body
  const userName = req.body.name;

  // Create a user object (only storing the name in this example)
  const user = { name: userName };

  /**
   * Generate a JWT token for the user.
   * The token will include the user object as payload and will be signed using
   * a secret key stored in the environment variable.
   * The token will expire in 1 hour.
   */
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

  // Respond with the generated access token
  res.json({ accessToken });
});

/**
 * Start the Express server
 * The application will listen on port 3000 for incoming HTTP requests.
 */
app.listen(3000, () => {
  console.log("Server running on port 3000");
});



//  Simple authentication working

// const users = []; // Existing users array

// // GET request to fetch users
// app.get("/", (req, res) => {
//   res.json(users);
// });

// // POST request to add a user
// app.post("/users-write", async (req, res) => {
//   try {
//     // Hash the password correctly with 10 salt rounds
//     const hashPassword = await bcrypt.hash(req.body.password, 10);

//     // Create a new user object
//     const newUser = { name: req.body.name, password: hashPassword };

//     // Push to existing users array
//     users.push(newUser);

//     res.status(201).json({ message: "User added successfully", users });
//   } catch (error) {
//     console.error("Error hashing password:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.post("/user/login", async (req, res) => {
//   const user = users.find(u => u.name === req.body.name); // Find user by name

//   if (!user) {
//     return res.status(400).json({ error: "User does not exist" });
//   }

//   try {
//     // Compare hashed password
//     const allowed = await bcrypt.compare(req.body.password, user.password);

//     if (allowed) {
//       res.json({ message: "Login successful" });
//     } else {
//       res.status(401).json({ error: "Invalid password" });
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Start server

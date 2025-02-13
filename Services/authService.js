const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()


exports.createUser = async (userData,res) => {
 const { name, email, password } = userData;
  // Find the user in the database
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exist, Please login");
  

  const hashPassword = await bcrypt.hash(password, 10);
  const userId = new mongoose.Types.ObjectId().toString();
   if (mongoose.connection.readyState !== 1) {
         return false
     }
         const user = new User({
             name: name,
             email: email,
             password:hashPassword,
             userId: userId,
         });
 
         await user.save();
         generateToken(userData,res)
  return user;
};

exports.loginUser = async ({ email, password },res) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid password");

  const token = generateToken(user,res); // Assume this function exists
  return token;
};

const generateToken = (user, res) => {
  
    const accessToken = jwt.sign(
        { email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' } // Short expiration for security
    );

    const refreshToken = jwt.sign(
        { email: user.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' } // Longer expiration
    );
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000, // 15 minutes
    });

    // Store refresh token in an HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return accessToken
};



exports.refreshingToken = async(req,res)=>{
     const refreshToken = req.cookies.refreshToken;
      if (!refreshToken)
        return res.status(401).json({ message: "No refresh token" });
    
      // Verify refresh token
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid refresh token" });
    
        // Generate new access token
        const newAccessToken = generateToken(
          user,
          res
        );
    
        // Set new access token in cookies
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 15 * 60 * 1000, // 15 minutes
        });
    
        res.json({ message: "Token refreshed" });
      });
}
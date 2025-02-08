import express from 'express'
import bcrypt from 'bcrypt'
import { User } from './SchemaFDatabase.js';
import { generateToken } from './token&&useridgenerator.js';
import jwt from 'jsonwebtoken'


const app = express()
app.use(express.json())
const port = 4007

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer token"

    if (!token) return res.status(401).json({ message: "Access Denied" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid or expired token" });

        req.user = user;
        next();
    });
};

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Please SignUp" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Generate token and set cookie
    const accessToken = generateToken(user, res);


    res.status(200).json(accessToken);
});


app.post('/refresh-token', (req,res)=>{
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });

    // Verify refresh token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid refresh token' });

        // Generate new access token
        const newAccessToken = generateToken({ userId: user.userId, email: user.email },res);

        // Set new access token in cookies
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000, // 15 minutes
        });

        res.json({ message: 'Token refreshed' });
    });
})






app.listen(port,()=>
{
    console.log("server running at the port",port)
})
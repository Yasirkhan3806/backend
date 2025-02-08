import mongoose from "mongoose";
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';

dotenv.config();


 export const userId = ()=>{
    const userId = new mongoose.Types.ObjectId().toString();
    return userId
}

export const generateToken = (user, res) => {
    const accessToken = jwt.sign(
        { userId: user.userId, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' } // Short expiration for security
    );

    const refreshToken = jwt.sign(
        { userId: user.userId },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' } // Longer expiration
    );
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000, // 15 minutes
    });

    // Store refresh token in an HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return accessToken
};
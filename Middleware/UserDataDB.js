
import mongoose from 'mongoose';
import { User } from '../Models/User.js';


export const setUserData = async (name,email,password,userId) => {
    if (mongoose.connection.readyState !== 1) {
        return false
    }

    try {
        const user = new User({
            name: name,
            email: email,
            password:password,
            userId: userId,
        });

        await user.save();
        return true
    } catch (err) {
        return err
    }
};

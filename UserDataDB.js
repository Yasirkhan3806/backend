import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import { User } from './SchemaFDatabase.js';
import { userId } from './token&&useridgenerator.js';

const app = express();
app.use(express.json());

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/users');
    console.log("Connected to MongoDB");
}
main().catch(err => console.log(err));

app.post('/write-user-data', async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(500).json({ message: "Database not connected" });
    }

    try {
        const hashPassword = await bcrypt.hash(req.body.password,10)
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password:hashPassword,
            userId: userId(),
        });

        await user.save();
        res.json({ message: "User saved successfully!", user });
    } catch (err) {
        res.status(500).json({ message: "Error saving user", error: err.message });
    }
});

app.listen(4000, () => {
    console.log("Server running on port 4000");
    
});

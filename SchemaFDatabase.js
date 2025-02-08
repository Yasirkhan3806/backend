import { Schema } from "mongoose";
import mongoose from "mongoose";

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/users');
}
main().catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password: String,
    userId:String
},{ collection: 'usersData' })


export const User = mongoose.model('User',userSchema)

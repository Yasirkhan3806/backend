
module.exports= (io) => {
    const User = require('../models/User');1

return { getUserData: async(email)=>{
    /*
    parameters: email
    description: This function retrieves user data from the database based on the provided email address.
    return: user data
    */ 
    // Code to query the database and return the user data
    try{
        const userData = await User.findOne({ email });
        return userData;
    }catch(e){
        throw new Error(e);
    }
   
},

updateUserName: async (email, newName) => {
       /*
    parameters: email
    description: This function updates the user's name in the database based on the provided email address.
    return: true if update is successful, false otherwise
    */ 
    // Code to update the database and return true if successful, false otherwise
    try {
        const response = await User.updateOne({ email }, { $set: { name: newName } });
        console.log(response);
        // Emit to the room (email-based room)
        io.to(email).emit('nameUpdated', { success: true });

        return true;
    } catch (e) {
        throw new Error(e);
    }
}
}

};
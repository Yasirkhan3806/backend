



module.exports=(io)=>{
    const userDataService = require('../Services/userDataService')(io);
     return{getUser:async(req,res)=>{
        /*
        parameters: req, res
        description: This function is a controller function that analyze the results of the getUserData function
        return: response to the api call 
        */ 
       try{
             const response = await userDataService.getUserData(req.user.email)
             res.status(201).json({ response });
       }catch(e){
           res.status(400).json({ message: e.message });
       }
        
    },
    
     updateUser:async(req,res)=>{
        /*
        parameters: req, res
        description: This function is a controller function that analyze the results of the updateUserName function
        return: response to the api call 
        */ 
        try{
             const response = await userDataService.updateUserName(req.user.email,req.body.updatedName)
             res.status(201).json({ response });
       }catch(e){
           res.status(400).json({ message: e.message });
       }
    
    }}
};
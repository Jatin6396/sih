const jwt=require("jsonwebtoken");
const User=require("../models/User");
const redisclient = require("../config/redis");


const adminmiddlewares=async(req,res,next)=>{
    
    try{

        const{role}=req.payload;
      
       if(role!== "admin"){
        throw new Error("Unauthorized access, admin role required");}
        next();
}
    catch(err){
        const errstatus=err.statusCode || 500;
       
        res.status(errstatus).send("Internal Server Error: "+err.message);
    }
}

module.exports=adminmiddlewares;






   



   

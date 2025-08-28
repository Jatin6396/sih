const jwt=require("jsonwebtoken");
const User=require("../models/User");
const redisclient = require("../config/redis");


const userMiddlewares=async(req,res,next)=>{
    try{
        // fetch the token
   const token=req.cookies.token;
   if(!token){
    throw new Error("token is not present");
   }


   const payload=jwt.verify(token,process.env.SECRET_KEY);
   const _id=payload._id;

   if(!_id){
    throw new Error("Invalid token");

   }

   const result=await User.findById(_id);
   if(!result){
    throw new Error("Account does not exist");}

    // redis client logic
    const isBlocked=await redisclient.exists(`token:${token}`);

    if(isBlocked){
        throw new Error("Invalid token");}

        req.result=result;
        req.payload=payload;
        next();




    }
    catch(err){
        const errstatus=err.statusCode || 500;
        res.status(errstatus).send("Internal Server Error: "+err.message);
    }
}

module.exports=userMiddlewares;
const User=require("../models/User");
const validate=require("../utils/validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const redisclient=require("../config/redis");
const Submission=require("../models/submission")

const register=async(req,res)=>{
    // Registration logic here
    try{

        //validate the user
        validate(req.body);
        const {FirstName,emailId,password,confirmpassword}=req.body;
        //password hashing
        const existingUser= await User.findOne({emailId})
        if(existingUser){
            throw new Error("User already exists with this emailId");
        }
        //checking confirm pass to original pass

        if(password!==confirmpassword){
            throw new Error("confirm Password Mismatch")
        }
        req.body.password=await bcrypt.hash(password,10);
        req.body.confirmpassword=await bcrypt.hash(password,10);

       
       // req.body.role="user";


        const user= await User.create(req.body);
         
        //jwt token generation
      const token=  jwt.sign({_id:user._id,emailId:emailId,role:user.role},process.env.SECRET_KEY,{expiresIn:60*60})
      
      const reply={
            firstName:user.FirstName,
            emailId:user.emailId,
            _id:user._id

        }


      res.cookie("token",token,{maxAge:60*60*1000});
      res.status(201).json({
        user:reply,
            message:"Registered Successfully"

      })

      


    

    }

    catch(err){
        console.error(err);
        res.status(400).send("error"+err)

    }
}

const login=async(req,res)=>{
    // Login logic here
    try{
        const {emailId,password}=req.body;
    

        if(!emailId || !password){
            throw new Error("Invalid credentials")
        }

        const user=await User.findOne({emailId});

        if(!user){
            throw new Error("User not found");
        }
        // if(user.isBlocked){
        //     throw new Error("User is blocked, contact admin");
        // }
        //console.log(user.password,user.emailId);

        const match=await bcrypt.compare(password,user.password);

        if(!match){
            throw new Error("Invalid Crenditinal")
        }
        const reply={
            firstName:user.FirstName,
            emailId:user.emailId,
            _id:user._id,
            role:user.role,
            isBlocked:user.isBlocked

        }
        const token=  jwt.sign({_id:user._id,emailId:emailId,role:user.role},process.env.SECRET_KEY,{expiresIn:60*60})

          res.cookie("token",token,{maxAge:60*60*1000});
          res.status(200).json({
            user:reply,
            message:"Login Successfully"
    })
          




    }
    catch(err){
        console.error(err);
        res.status(401).send("error"+err)
        
    }
}

const logout=async(req,res)=>{
    try{
        const {token}=req.cookies;
        const payload=jwt.decode(token);
        await redisclient.set(`token:${token}`,'blocked');
        await redisclient.expireAt(`token:${token}`,payload.exp);

        res.cookie("token",null,{expires:new Date(Date.now())});

        res.send("User logged out successfully");
        

    }
    catch(err){
        res.status(401).send("Error"+err);
        
    }
}

const adminregister=async(req,res)=>{
    // Admin registration logic here
     try{

        //validate the user
        validate(req.body);
        const {FirstName,emailId,password,role}=req.body;


        req.body.password=await bcrypt.hash(password,10);
        req.result.role="admin";


        const user= await User.create(req.body);
        

        //jwt token generation
      const token=  jwt.sign({_id:user._id,emailId:emailId,role:user.role},process.env.SECRET_KEY,{expiresIn:60*60*1000})

      res.cookie("token",token,{maxAge:60*60*1000});
      res.status(201).send("Admin Registered Successfully");

      


    

    }

    catch(err){

        const errstatus=err.statuscCode || 400;
        res.status(errstatus).send(err.message);

    }
}

const deleteProfile=async(req,res)=>{

    try{
        const userId=req.result._id;

        await User.findByIdAndDelete(userId);
        // await Submission.deleteMany({userId});

        

        res.status(200).send("Deleted Profile")

    }
    catch(err){
       errStatus=err.statuscCode || 500;
        res.status(errStatus).send("Internal Server Error"+err.message)
    }

}

module.exports={login,register,logout,adminregister,deleteProfile};
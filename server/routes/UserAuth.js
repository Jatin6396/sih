const express=require("express");
const {login,register,logout,adminregister}=require("../controllers/userAuth");
const userMiddlewares = require("../middlewares/usermiddlewares");
const adminmiddlewares = require("../middlewares/adminmiddlewares");
const User = require("../models/User");
const {getAllUser,blockedUser,deleteUser}=require("../controllers/AdminPower");

const authRouter=express.Router();

authRouter.get('/check',userMiddlewares,(req,res)=>{
    const reply={
        firstName:req.result.firstName,
        emailId:req.result.emailId,
        _id:req.result._id,
    }
    res.status(201).json({
        user:reply,
        message:"valid User"
    })
})


authRouter.post("/register",register);
authRouter.post("/login",login);
authRouter.post("/logout",userMiddlewares,logout);
authRouter.post("/admin/register",userMiddlewares,adminmiddlewares,adminregister);
authRouter.get("/admin/users",getAllUser);
authRouter.patch("/admin/block/:id",userMiddlewares,adminmiddlewares,blockedUser);
authRouter.delete("/admin/delete/:id",userMiddlewares,adminmiddlewares,deleteUser);


// // Google Signin
// // Redirect user to Google's consent screen
// authRouter.get('/google', redirectToGooglePage);

// // Handle callback and get tokens
// authRouter.get('/google/callback', authWithGoogle);

// // Github signin
// authRouter.get('/github', redirectToGithubPage);
// authRouter.get('/github/callback', authWithGithub);

// // to send verification link to the user's email id
// authRouter.get('/verify-email/initialize', verifyToken, doesAccountExist, sendVerificationEmail);

// // to verify email
// authRouter.get('/verify-email', verifyEmail);
// //authRouter.delete("/deleteProfile",userMiddlewares,deleteProfile);

// //authRouter.get("getProfile",getProfile);

module.exports=authRouter;
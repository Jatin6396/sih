const express=require("express");
const userMiddlewares = require("../middlewares/usermiddlewares");
const {userSubmission,runCode}=require("../controllers/userSubmission")

const submitRouter=express.Router();


submitRouter.post("/submit/:id",userMiddlewares,userSubmission);
submitRouter.post("/run/:id",userMiddlewares,runCode);

module.exports=submitRouter;
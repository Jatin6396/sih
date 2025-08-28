const express=require("express");
const adminmiddlewares = require("../middlewares/adminmiddlewares");
const {createProblem,problemUpdate,getProblemById,deleteProblem,getAllProblem,solvedProblemByUser} = require("../controllers/userProblem");
const userMiddlewares = require("../middlewares/usermiddlewares");


const problemRouter=express.Router();



problemRouter.post("/create",userMiddlewares,adminmiddlewares,createProblem);
problemRouter.put("/update/:id",userMiddlewares,adminmiddlewares,problemUpdate);
problemRouter.delete("/delete/:id",userMiddlewares,adminmiddlewares,deleteProblem);
problemRouter.get("/problemById/:id",userMiddlewares,getProblemById);
problemRouter.get("/getAllProblem",userMiddlewares,getAllProblem);


problemRouter.get("/problemSolvedByUser",userMiddlewares,solvedProblemByUser);

module.exports=problemRouter;
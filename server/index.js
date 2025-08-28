const express=require("express");

const app=express();

require("dotenv").config();
const cookieParser=require("cookie-parser");;
const main=require("./config/db");
const authRouter=require("./routes/UserAuth");
const redisclient=require("./config/redis");
const problemRouter=require("./routes/problemCreator");
const submitRouter=require("./routes/submit")
const cors=require('cors');

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))


app.use("/users",authRouter);
app.use("/problems",problemRouter)
app.use("/submission",submitRouter)


const InitalizeConnection=async()=>{
    try{
        await Promise.all([main(),redisclient.connect()]) //
        console.log("Connected to Redis and MongoDB");
        app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    });

    }
    catch(err){
        console.log("Error in initializing connection: "+err);
    }
}

InitalizeConnection();

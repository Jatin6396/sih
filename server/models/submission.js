const mongoose=require("mongoose");

const submissionSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    problemId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"problem",
        required:true,
    },
    code:{
        type:String,
        required:true,
    },
    language:{
        type:String,
        enum:["JavaScript","cpp","java",],
        required:true,
    },
    status:{
        type:String,
        enum:["pending","accepted","wrong","error"],
        required:true,
    },
    runtime:{
        type:Number,
        default:0

    },
    memory:{
        type:Number,
        default:0
    },
    errorMessage:{
        type:String,
        default:""
    },
    testCasesPassed:{
        type:Number,
        default:0,
    },
    testCasesTotal:{
        type:Number,
        default:0,
    }

} ,  {timeStamps:true}
);

module.exports=mongoose.model("submission",submissionSchema)
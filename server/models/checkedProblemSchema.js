const mongoose=require('mongoose');


const checkedProblemSchema=new mongoose.Schema({
    pid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"problem"
    },
     isSolved: {
        type: Boolean,
    },
    submitDate: {
        type: Date,
    }
}, { _id: false });

module.exports=mongoose.model("checkedProblem",checkedProblemSchema)

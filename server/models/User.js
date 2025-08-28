const mongoose=require("mongoose");


const streakSchema = new mongoose.Schema({
  current: {
    type: Number,
    default: 1,
    min: 0
  },
  longest: {
    type: Number,
    default: 1,
    min: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
})



const sprint = new mongoose.Schema({
  sprintName: {
    type: String,
    minLength: 1,
    maxLength: 50,
    trim: true
  },
  description: {
    type: String,
    minLength: 1,
    maxLength: 150,
    trim: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  problems: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'problems',
  }
}, { _id: false, timestamps: true });



const UserSchema=new mongoose.Schema({
    FirstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    },
    LastName:{
        type:String,
        minLength:3,
        maxLength:20
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        immutable:true,
    },
    emailVerified:{
        type:Boolean,
        default:false,

    },
    profileImageUrl:{
        type:String,
        trim:true,
    },
    age:{
        type:Number,
        min:10,
        max:80,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
    },
    isBlocked:{
        type:Boolean,
        default:false,
    },
    problemSolved:{
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Problem",
        }],
        unique:true,
        
    },
    password:{
        type:String,
        required:true,
    },
     confirmpassword:{
        type:String,
        required:true,
    },
    noOfSolvedProblem:{
        type:Number,
        min:0,
        default:0,
    },
    checkedProblem:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"checkedProbleme"
    

    },
    favoriteProblem:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Problem'
    },
    likedProblem:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Problem'
    },
    bookmarks:{
        type:[sprint]
    },
    points:{
        type:Number,
        min:0,
        default:0,
        required:true,
    },
    streaks:{
        type:streakSchema,
        required:true,
        default:()=>({}),
    }


},{
    timestamps:true,
}
);


UserSchema.post('findOneAndDelete',async function(doc){
    if(doc){
        await mongoose.model('submission').deleteMany({userId:doc._id})
    }

});
module.exports=mongoose.model("User",UserSchema);
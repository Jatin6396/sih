const User=require("../models/User");
const getAllUser=async(req,res)=>{
   
    try{
        const users=await User.find({});
        const reply = users.map((u) => ({
      firstName: u.FirstName,   
      emailId: u.emailId,       
      _id: u._id,
      role: u.role,
      problemsSolved: u.problemSolved ? u.problemSolved.length : 0,
      isBlocked: u.isBlocked,
    }));

        res.status(200).json(
            {
                users:reply,
                message:"All Users fetched successfully"
            }
        );
    }
    catch(err){
        res.status(400).send("Error Occured: "+err.message);
    }
}

const blockedUser= async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    if (!user) return res.status(404).json({ error: "User not found" });
    if(user.role==="admin"){
      throw new Error("Cannot block/unblock an admin user");
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.json({ message: "User status updated", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const deleteUser=async (req, res) => {
  try {
    const res= await User.findById(req.params.id);
    if(res.role==="admin"){ 
      throw new Error("Cannot delete an admin user");
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports={getAllUser,blockedUser,deleteUser};
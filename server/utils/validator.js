const validator=require("validator")

const validate=(data)=>{
    const mandatoryFields=["FirstName","emailId","password","confirmpassword"];

    const ISAllowed=mandatoryFields.every((key)=>Object.keys(data).includes(key));

    if(!ISAllowed){
        throw new Error("Mandatory fields are missing");
    }
    if(!validator.isEmail(data.emailId)){
        throw new Error("Invalid email format");

    }
    if(!validator.isStrongPassword(data.password)){
        throw new Error("Password is not strong enough");
    }

}

module.exports=validate;
const bcrypt  = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");

// ----------------------------------------Register--------------------------------------

const registerController = async(req,res)=>{
    try{
        const{name,email,password,role} = req.body;

        if(!name || !email || !password ){
            return res.status(400).json({message:"Please provide all fields..."})
        }

        //check user
        const existuser = await userModel.findOne({email})
        if(existuser)
            return res.status(400).json({message:"You are already register..."})

        //hash password
        const hash = await bcrypt.hash(password,10);

        //create user
        const user = await userModel.create({
            name,
            email,
            password:hash,
            role
        })
        await user.save();
        res.status(200).json({message:"user registerd sucessfully....",user})

    }
    catch(error){
        console.log(error)
        res.status(500).json({Message:"Error in register Api....",error})
    }

}


// --------------------------------------------Login-----------------------------------------
const loginController = async(req,res) => {
    try{
        const{email , password} = req.body;

        //check user
        const user = await userModel.findOne({email})
        if(!user){
            return  res.status(404).send({ message: "User not found..." })
        }

        //compare password

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return  res.status(400).send({message:"Your password is not matched"});
        }

        //token
        const token = jwt.sign({role:user.role, email:user.email},process.env.TOKEN)

        res.status(200).send({message:"login sucessfully....",token,user})
    }
    catch(error){
        console.log(error)
        res.status(500).json({Message:"Error in login Api....",error})
    }
}

module.exports = {registerController,loginController}




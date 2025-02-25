const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");


const verifyToken = (req,res,next) =>{
    try{
        const token = req.headers["authorization"].split(" ")[1]
        jwt.verify(token,process.env.TOKEN,(err,decode)=>{
            if(err){
                return res.status(401).json({Message:"Unauthorised User"})
            }
            else{
                req.user = decode
                next();
            }
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({Message:"Error in Verify token.....",error})
    }       
}


// Role-based Access control

const admin = (req,res,next) =>{
    try{
        if(req.user && req.user.role === "admin")
            next();
        else{
            res.status(403).json({Message:"Admin Acess Required..."})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({Message:"Error in Access control.....",error})
    }    
    
}

module.exports = {verifyToken,admin}


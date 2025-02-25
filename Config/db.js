const mongoose = require("mongoose");

const connectDB = async () =>{
    try{
        mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected Sucessfully.....")
    }
    catch(error){
        console.log("Database Connection Failed....",error)
    }
}

module.exports = connectDB;
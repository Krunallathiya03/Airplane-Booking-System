

// -------------------------------------Get All Users-------------------------------------

const getAllUserController = async(req,res)=>{
    try{
       
    }
    catch(error){
        console.log(error)
        res.status(500).json({Message:"Error in Get All User Api....",error})
    }

}

// -------------------------------------------Get User By Id---------------------------------------
const getUserByIdController = async(req,res)=>{
    try{
       
    }
    catch(error){
        console.log(error)
        res.status(500).json({Message:"Error in Get User By Id Api....",error})
    }
}

// --------------------------------------Update User-----------------------------------
const updateUserController = async(req,res)=>{
    try{
       
    }
    catch(error){
        console.log(error)
        res.status(500).json({Message:"Error in  Updete  User Api....",error})
    }

}

// --------------------------------------Upadate User----------------------------------------

const updatePasswordController = async(req,res)=>{
    try{
       
    }
    catch(error){
        console.log(error)
        res.status(500).json({Message:"Error in Update User Api....",error})
    }

}


// ------------------------------------------Delete User----------------------------------------

const deleteUserController = async(req,res)=>{
    try{
       
    }
    catch(error){
        console.log(error)
        res.status(500).json({Message:"Error in delete User Api....",error})
    }

}



module.exports = {getAllUserController,
                  getUserByIdController,
                  updateUserController,
                  updatePasswordController,
                  deleteUserController
}
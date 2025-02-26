const express = require("express");
const { addFlightController,
        getFlightController,
        getFlightByIdController,
        updateFlightController,
        deleteFlightController, 
 } = require("../Controllers/flightController");
const { verifyToken, admin } = require("../Middlewares/authMiddleware");



const route = express.Router();

// Add flights   Admin only
route.post("/add",verifyToken,admin,addFlightController)

//get Flight
route.get("/get",getFlightController)

//get Flight by id
route.get("/get/:id",getFlightByIdController)

//update flight   //admin only
route.put("/update/:id",verifyToken,admin,updateFlightController)

//detale flight  //admin only
route.delete("/delete/:id",verifyToken,admin,deleteFlightController)



module.exports = route;
const express = require("express");
const { bookingController, 
        getTicketControllr, 
        cancleBookingController, 
        generateETicketController} = require("../Controllers/bookingController");
const { verifyToken} = require("../Middlewares/authMiddleware");

const route = express.Router();


//book flight
route.post("/",verifyToken,bookingController)

//get user's booking
route.get("/get",verifyToken,getTicketControllr)

//cancle Booking
route.delete("/delete/:id",verifyToken,cancleBookingController)

//generate E-Ticket
route.get("/:id/ticket",verifyToken,generateETicketController)


module.exports = route;
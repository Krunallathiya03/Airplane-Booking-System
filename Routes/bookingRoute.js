const express = require("express");
const { bookingController, 
        getTicketControllr, 
        cancleBookingController } = require("../Controllers/bookingController");
const { verifyToken} = require("../Middlewares/authMiddleware");

const route = express.Router();


//book flight
route.post("/",verifyToken,bookingController)

//get user's booking
route.get("/get",getTicketControllr)

//cancle Booking
route.delete("/delete/:id",cancleBookingController)

//generate E-Ticket


module.exports = route;
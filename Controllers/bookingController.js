const bookingModel = require("../Models/bookingModel");
const flightModel = require("../Models/flightModel")

// ------------------------------Book Flight Ticket -----------------------------------
const bookingController = async (req,res) =>{
    try{
        const {flightId ,seats} = req.body

        const flight = await flightModel.findById(flightId);
        if(!flight)
            return res.status(404).json({message:"Flight Not Found"})

        if(flight.seatsAvailable < seats)
            return res.status(400).json({message:"Not enough seats available"})

        let PricePerSeat = flight.price
        if(flight.seatsAvailable <= 10)
            PricePerSeat *= 1.05  //incress by 5%   

        const totalAmount = PricePerSeat*seats;
        console.log(req)
        const booking = await bookingModel.create({
            user:req.user.id,
            flight:flightId,
            seats,
            totalAmount,
            paymentStatus:"Pending",
        })

        flight.seatsAvailable -= seats;
        await flight.save();

        res.status(201).json({message:"Booking Sucessfully....",booking})

    }   
    catch(error){
        console.log(error)
        res.status(500).json({Message:"Error in Book  flight  Api....",error})
    }
}


// -------------------------------Get User Bookings---------------------------------------
const getTicketControllr = async (req,res) =>{
    try{

    }
    catch(error){
        console.log(error)
        res.status(500).json({Message:"Error in get user's booking Api....",error})
    }
}

//------------------------------cancle booking-----------------------------------------

const cancleBookingController = async (req,res) =>{
    try{

    }
    catch(error){
        console.log(error)
        res.status(500).json({Message:"Error in cancle booking Api....",error})
    }
}


module.exports = {bookingController,
                  getTicketControllr,
                  cancleBookingController
}


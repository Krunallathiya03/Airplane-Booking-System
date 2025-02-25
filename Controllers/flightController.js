const flightModel = require("../Models/flightModel");


// ------------------- Add Flight----------------------------------

const addFlightController = async(req,res) => {
    try{
        const flight = await flightModel.create(req.body);
        res.status(201).json({Message:"Flight Created...",flight})
    }
    catch(error){
        console.log(error)
        res.status(500).json({Message:"Error in Add flight  Api....",error})
    }
}


// ----------------------------get Flights with filter ------------------------------------

const getFlightController = async(req,res) => {
    try{
        const {departureCity,arrivalCity,date,minPrice,maxPrice} = req.query;

        if (req.path === "/flight/get"){
            const flight = await flightModel.find();
            //res.json({totalFlights:flight.length,flight})
        }
        let filter = {};

        if(departureCity) filter.departureCity = departureCity;
        if(arrivalCity) filter.arrivalCity = arrivalCity;
        
        if(date){
            const start = new Date(date);
            const end = new Date(date);
            end.setHours(23, 59, 59, 999);
            filter.dipartureTime = {$gte: start , $lte: end};
        }

        if(minPrice) filter.price = {...filter.price ,$gte:minPrice}
        if(maxPrice) filter.price = {...filter.price ,$lte:maxPrice}

        const flights = await flightModel.find(filter)
        res.status(200).json(flights)

    }
    catch(error){
        console.log(error)
        res.status(500).json({Message:"Error in get flight  Api....",error})
    }
}


// ------------------------------- get flight by id--------------------------------

const getFlightByIdController = async(req,res) => {
    try{
        
    }
    catch(error){
        console.log(error)
        res.status(500).json({Message:"Error in get flight by id  Api....",error})
    }
}


// ----------------------------------------update Flight---------------------------

const updateFlightController = async(req,res) => {
    try{

    }
    catch(error){
        console.log(error)
        res.status(500).json({Message:"Error in Add Flight  Api....",error})
    }
}


// -----------------------------------delete flight----------------------------------

const deleteFlightController = async(req,res) => {
    try{

    }
    catch(error){
        console.log(error)
        res.status(500).json({Message:"Error in delete flight  Api....",error})
    }
}


module.exports = {addFlightController,
                  getFlightController,
                  getFlightByIdController,
                  updateFlightController,
                  deleteFlightController
}
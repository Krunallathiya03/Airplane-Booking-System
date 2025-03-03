const flightModel = require("../Models/flightModel");

// ------------------- Add Flight----------------------------------

const addFlightController = async (req, res) => {
  try {
    const flight = await flightModel.create(req.body);
    res.status(201).json({ Message: "Flight Created...", flight });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Error in Add flight  Api....", error });
  }
};

// ----------------------------get Flights with filter ------------------------------------

const getFlightController = async (req, res) => {
  try {
    const { departureCity, arrivalCity, date, minPrice, maxPrice } = req.query;

    // Initialize empty filter
    let filter = {};

    // If no filters are applied, return all flights (avoiding duplicate responses)
    if (req.path === "/get" && Object.keys(req.query).length === 0) {
      const allFlights = await flightModel.find();
      return res.json({ totalFlights: allFlights.length, flights: allFlights });
    }

    // Apply filters dynamically
    if (departureCity) filter.departureCity = departureCity;
    if (arrivalCity) filter.arrivalCity = arrivalCity;

    // Handle date filtering
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      filter.departureTime = { $gte: start, $lte: end };
    }

    // Handle price range filtering
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Fetch filtered flights
    const flights = await flightModel.find(filter);

    // Send response once
    res.status(200).json({ totalFlights: flights.length, flights });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in get flight API", error });
  }
};

// ------------------------------- get flight by id--------------------------------

const getFlightByIdController = async (req, res) => {
  try {
    const flight = await flightModel.findById(req.params.id);
    if (!flight) return res.status(500).json({ Message: "Flight not found" });

    res.status(200).json(flight);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ Message: "Error in get flight by id  Api....", error });
  }
};

// ----------------------------------------update Flight---------------------------

const updateFlightController = async (req, res) => {
  try {
    const flight = await flightModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!flight) return res.status(500).json({ message: "Flight not found" });

    res.status(200).json(flight);
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Error in Add Flight  Api....", error });
  }
};

// -----------------------------------delete flight----------------------------------

const deleteFlightController = async (req, res) => {
  try {
    const flight = await flightModel.findByIdAndDelete(req.params.id);
    if (!flight) return res.status(500).json({ message: "Flight not found" });
    res.status(200).json(flight);
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Error in delete flight  Api....", error });
  }
};

module.exports = {
  addFlightController,
  getFlightController,
  getFlightByIdController,
  updateFlightController,
  deleteFlightController,
};

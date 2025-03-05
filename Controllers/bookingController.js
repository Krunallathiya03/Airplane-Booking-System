const bookingModel = require("../Models/bookingModel");
const flightModel = require("../Models/flightModel");
const { sendBookingEmail } = require("../Utils/emailServices");
const { generateTicketPdf } = require("../Utils/pdfGenerate");

// ------------------------------Book Flight Ticket -----------------------------------
const bookingController = async (req, res) => {
  try {
    const { flightId, seats } = req.body;

    const flight = await flightModel.findById(flightId);
    // console.log(flight);

    if (!flight) return res.status(404).json({ message: "Flight Not Found" });

    if (flight.seatsAvailable < seats)
      return res.status(400).json({ message: "Not enough seats available" });

    let pricePerSeat = flight.price;
    if (flight.seatsAvailable <= 10) pricePerSeat *= 1.05; //incress by 5%

    const totalAmount = pricePerSeat * seats;
    // console.log(req.user)
    const booking = await bookingModel.create({
      user: req.user.id,
      flight: flightId,
      seats,
      totalAmount,
      paymentStatus: "Pending",
    });

    flight.seatsAvailable -= seats;
    await flight.save();

    //send Booking confirmation email
    //sendBookingEmail(req.user.email, booking, flight);
    // for (let i = 0; i < 20; i++) {
    //   await sendBookingEmail(req.user.email, booking, flight);
    //   console.log(`Email sent ${i + 1} times`);
    // }
    const emailPromises = Array.from({ length:1}, () =>
      sendBookingEmail(req.user.email, booking, flight)
    );

    await Promise.all(emailPromises);

    res.status(201).json({ message: "Booking Sucessfully....", booking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Error in Book  flight  Api....", error });
  }
};

// -------------------------------Get User Bookings---------------------------------------
const getTicketControllr = async (req, res) => {
  try {
    const bookings = await bookingModel
      .find({ user: req.user.id })
      .populate("flight");
    res.status(200).json({ totalBookings: bookings.length, bookings });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ Message: "Error in get user's booking Api....", error });
  }
};

//------------------------------cancle booking-----------------------------------------

const cancleBookingController = async (req, res) => {
  try {
    const bookingId = req.params.id;
    if (!bookingId)
      return res.status(404).json({ message: "Booking id require..." });

    const booking = await bookingModel.findById(bookingId);
    if (!booking)
      return res.status(404).json({ message: "Booking not found..." });

    const flight = await flightModel.findById(booking.flight);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    booking.status = "Cancelled";
    booking.paymentStatus = "Refund";

    flight.seatsAvailable += booking.seats;

    await booking.save();
    await flight.save();

    await booking.save();

    res.status(200).json({ Message: "Booking Cancle", booking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Error in cancle booking Api....", error });
  }
};

const generateETicketController = async (req, res) => {
  try {
    const booking = await bookingModel
      .findById(req.params.id)
      .populate("flight user");
    if (!booking)
      return res.status(400).json({ message: "Booking not found.." });

    const pdfPath = await generateTicketPdf(booking);
    res.download(pdfPath);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ Message: "Error in generate e-ticket  Api....", error });
  }
};

module.exports = {
  bookingController,
  getTicketControllr,
  cancleBookingController,
  generateETicketController,
};

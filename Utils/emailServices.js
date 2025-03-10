const nodemailer = require("nodemailer");
const express = require("express");

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendBookingEmail = async (email, booking, flight) => {
  console.log(email);

  if (!booking) {
    console.error(" Booking data is missing!");
    throw new Error("Booking not found");
  }
  // console.log(flight);

  if (!flight) {
    console.error(" Flight data is missing in the booking!");
    throw new Error("Flight details not found");
  }
  //console.log(booking)
  // console.log(flight);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Flight Booking Confirmation",
    text: `Your Booking is Confirmed!\n\nFlight:${flight.airline} (${flight.flightNumber})\nDeparture:${flight.departureCity} -> ${flight.arrivalCity}\nSeats:${booking.seats}\nTotal Amount:${booking.totalAmount}\nBooking Id:${booking._id}`,
    html: `
            <h2>Booking Confirmation </h2>
            <p>Dear ${email},</p>
            <p>Your Flight booking has been confirmed!</p>
            <ul>
                <li><strong>Flight:</strong> ${flight.airline} (${flight.flightNumber})</li>
                <li><strong>Departure:</strong> ${flight.departureCity} ➝ ${flight.arrivalCity}</li>
                <li><strong>Seats:</strong> ${booking.seats}</li>
                <li><strong>Total Amount:</strong> $${booking.totalAmount}</li>
                <li><strong>Booking ID:</strong> ${booking._id}</li>
            </ul>
            <p>Thank You for choosing our service! </p>
            `,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent Successfully to ${email}`);
  } catch (error) {
    console.log("Error sending email:", error);
  }
};

// ---------------------------send otp --------------------------------------

const sendOtp = async(email,otp) =>{

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject:"Your Admin Login Otp",
      text:`Your One-Time Password (OTP) is: ${otp}. This OTP is valid for 5 minutes.`,
    };

   
    try{
      await transporter.sendMail(mailOptions);
      console.log(`Email sent Successfully to ${email}`);
    }
  
  catch(error){
    console.log("Error sending email:", error);
    
  }
}

module.exports = { sendBookingEmail ,sendOtp };

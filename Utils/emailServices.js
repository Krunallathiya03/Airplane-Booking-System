    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
        service:"Gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    });

    const sendBookingEmail = async(email,booking) =>{
        if (!booking) {
            console.error("❌ Booking data is missing!");
            throw new Error("Booking not found");
        }
        if (!booking.flight) {
            console.error("❌ Flight data is missing in the booking!");
            throw new Error("Flight details not found");
        }
        console.log(booking)
        console.log(booking.flight);
        
        const mailOptions ={
            from:process.env.EMAIL_USER,
            to:email,
            subject:"Flight Booking Confirmation",
            text:`Your Booking is Confirmed!\n\nFlight:${booking.flight.airline} (${booking.flight.flightNumber})\nDeparture:${booking.flight.departureCity} -> ${booking.flight.arrivalCity}\nSeats:${booking.seats}\nTotal Amount:${booking.totalAmount}\nBooking Id:${booking._id}`,
            html:`
            <h2>Booking Confirmation </h2>
            <p>Dear ${booking.user.name},</p>
            <p>Your Flight booking has been confirmed!</p>
            <ul>
                <li><strong>Flight:</strong> ${booking.flight.airline} (${booking.flight.flightNumber})</li>
                <li><strong>Departure:</strong> ${booking.flight.departureCity} ➝ ${booking.flight.arrivalCity}</li>
                <li><strong>Seats:</strong> ${booking.seats}</li>
                <li><strong>Total Amount:</strong> $${booking.totalAmount}</li>
                <li><strong>Booking ID:</strong> ${booking._id}</li>
            </ul>
            <p>Thank You for choosing our service! </p>
            `,
        };
        try{
            await transporter.sendMail(mailOptions);
            console.log(`Email sent Successfully to ${email}`);
        }
        catch(error){
        console.log("Error sending email:",error);
        }
        
    }

    module.exports = {sendBookingEmail};
        
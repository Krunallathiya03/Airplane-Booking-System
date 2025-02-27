const   Pdf = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateTicketPdf = async (booking) =>{
    try{
        const pdfpath = path.join(__dirname,`../tickets/ticket-${booking._id}.pdf`);

        //create a pdf document
        const doc = new Pdf();
        const stream = fs.createWriteStream(pdfpath);
        doc.pipe(stream)

        //title
        doc.fontSize(22).text("E-Ticket", { align: "center", underline: true });
        doc.moveDown(2);

        //flight Details
        doc.fontSize(14);
        doc.text(`Flight:${booking.flight.airline} (${booking.flight.flightNumber})`);
        doc.text(`Departure: ${booking.flight.departureCity} -> ${booking.flight.arrivalCity}`);
        doc.text(`Departure Date:${new date(booking.flight.departureTime).toLocalString()}`);
        doc.moveDown(2);

        //booking detais
        doc.text(` Passenger Name: ${booking.user.name}`);
        doc.text(` Seats: ${booking.seats}`);
        doc.text(` Total Amount: $${booking.totalAmount}`);
        doc.text(` Booking ID: ${booking._id}`);
        doc.text(` Booking Date: ${new Date(booking.createdAt).toLocaleString()}`);
        doc.moveDown(2);

         // Footer
        doc.fontSize(12).text("Thank you for choosing our service!", { align: "center" });

        doc.end();

    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to generate ticket PDF");
        
      }
}

module.exports = {generateTicketPdf};

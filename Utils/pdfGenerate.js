const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");


const generateTicketPdf = async (booking) =>{
    try{
        const pdfPath = path.join(__dirname,`../tickets/ticket-${booking._id}.pdf`);

        //create a pdf document
        const doc = new PDFDocument();
        const stream = fs.createWriteStream(pdfPath);
        doc.pipe(stream)

        //title
        doc.fontSize(22).text("E-Ticket", { align: "center", underline: true });
        doc.moveDown(2);

        //flight Details
        doc.fontSize(14);
        doc.text(`Flight:${booking.flight.airline} (${booking.flight.flightNumber})`);
        doc.text(`Departure: ${booking.flight.departureCity} -> ${booking.flight.arrivalCity}`);
        doc.text(`Departure Date:${new Date(booking.flight.departureTime).toLocaleString()}`);
        doc.moveDown(2);

        //booking detais
        doc.fontSize(22).text("Passenger Details", { align: "center", underline: true });
        doc.moveDown(2);
        doc.text(` Passenger Name: ${booking.user.name}`);
        doc.text(` Seats: ${booking.seats}`);
        doc.text(` Total Amount: $${booking.totalAmount}`);
        doc.text(` Booking ID: ${booking._id}`);
        doc.text(` Booking Date: ${new Date(booking.createdAt).toLocaleString()}`);
        doc.moveDown(2);

         // Footer
        doc.fontSize(12).text("Thank you for choosing our service!", { align: "center" });

        doc.end();

        return new Promise((resolve,reject) =>{
            stream.on("finish", () => resolve(pdfPath));
            stream.on("error",reject);
        })

    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to generate ticket PDF");
        
      }
}

module.exports = {generateTicketPdf};

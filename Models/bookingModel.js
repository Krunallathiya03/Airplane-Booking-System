const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Booked", "Cancelled", "Refunded"],
      default: "Booked",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Refund"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Booking", bookingSchema);

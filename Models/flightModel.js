const mongoose = require("mongoose")

const flightSchema = new mongoose.Schema({
    airline: {
        type: String,
        required: true
    },
    flightNumber: {
        type: String,
        required: true,
        unique: true,
        uppercase:true
      
    },
    departureCity: {
        type: String,
        required: true,

    },
    arrivalCity: {
        type: String,
        required: true,
    },
    departureTime: {
        type: String,
        required: true,
    },
    arrivalTime: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    seatsAvailable: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ["Scheduled", "Delayed", "Cancelled"],
        default: "Scheduled"
    },



}, { timestamps: true });

module.exports = mongoose.model("Flight", flightSchema)
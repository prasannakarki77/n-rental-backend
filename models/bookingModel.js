const mongoose = require("mongoose");

const Booking = new mongoose.Schema({
  vehicle_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  no_of_days: {
    type: Number,
    required: true,
  },
  booking_date: {
    type: String,
    required: true,
  },
  booking_time: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact_no: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Booking", Booking);

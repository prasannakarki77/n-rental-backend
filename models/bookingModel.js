const mongoose = require("mongoose");

const Booking = new mongoose.Schema({
  vehicle_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  no_of_days: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Category", Category);

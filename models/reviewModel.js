const mongoose = require("mongoose");

const Review = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  vehicle_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: "Vehicle",
  },
  rating: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Review", Review);

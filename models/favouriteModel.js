const mongoose = require("mongoose");

const Favourite = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  vehicle_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: "Vehicle",
  },
});

module.exports = mongoose.model("Favourite", Favourite);

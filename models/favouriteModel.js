const mongoose = require("mongoose");

const Favourite = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  vehicle_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
  },
});

module.exports = mongoose.model("Favourite", Favourite);



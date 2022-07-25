const mongoose = require("mongoose");
const Vehicle = new mongoose.Schema({
  vehicle_name: {
    type: String,
    required: true,
  },
  vehicle_image: {
    type: String,
  },
  vehicle_company: {
    type: String,
    required: true,
  },
  vehicle_desc: {
    type: String,
    required: true,
  },
  vehicle_rich_desc: {
    type: String,
    required: true,
  },
  is_featured: {
    type: Boolean,
    required: true,
  },
  booking_cost: {
    type: String,
    required: true,
  },
  vehicle_sku: {
    type: String,
    required: true,
  },
  vehicle_category: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Vehicle", Vehicle);



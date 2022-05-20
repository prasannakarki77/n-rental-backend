const mongoose = require("mongoose");

//User Model Collection Create
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
  //   userId:{
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'Customer'
  //   }
});
module.exports = mongoose.model("Vehicle", Vehicle);

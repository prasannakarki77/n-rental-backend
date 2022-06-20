const mongoose = require("mongoose");

const Category = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
  },
  category_image: {
    type: String,
  
  },
});

module.exports = mongoose.model("Category", Category);

const mongoose = require("mongoose");

//User Model Collection Create
const Article = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  rich_description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});
module.exports = mongoose.model("Article", Article);

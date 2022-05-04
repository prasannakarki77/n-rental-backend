const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/n-rental_db1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

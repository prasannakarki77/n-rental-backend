const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(
  "mongodb+srv://kakashi77:prk.karki123@cluster0.4fn5zfq.mongodb.net/nrental_db?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

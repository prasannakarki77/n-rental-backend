const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/images"));
// Importing DB Connection
require("./db_connection/dbconnection");

//Importing Router // Modules are already in routes
const userRouter = require("./router/userRouter");
const adminRouter = require("./router/adminRouter");
const vehicleRouter = require("./router/vehicleRouter");
const categoryRouter = require("./router/categoryRouter");
const favouriteRouter = require("./router/favouriteRouter");
const articleRouter = require("./router/articleRouter");
const bookingRouter = require("./router/bookingRouter");
const reviewRouter = require("./router/reviewRouter");
app.use(userRouter);
app.use(adminRouter);
app.use(vehicleRouter);
app.use(categoryRouter);
app.use(favouriteRouter);
app.use(articleRouter);
app.use(bookingRouter);
app.use(reviewRouter);

app.listen(90);

module.exports = app;

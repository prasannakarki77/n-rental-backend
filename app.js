const express = require("express");

const app = express();
app.use(express.json());

// Importing DB Connection
require("./db_connection/dbconnection");

//Importing Router // Modules are already in routes
const customerRouter = require("./router/customerRouter");
const adminRouter = require("./router/adminRouter");
const vehicleRouter = require("./router/vehicleRouter");
const categoryRouter = require("./router/categoryRouter");
app.use(customerRouter);
app.use(adminRouter);
app.use(vehicleRouter);
app.use(categoryRouter);

app.listen(90);

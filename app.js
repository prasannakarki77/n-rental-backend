const express = require("express");

const app = express();
app.use(express.json());

// Importing DB Connection
require("./db_connection/dbconnection");

//Importing Router // Modules are already in routes
const customerRouter = require("./router/customerRouter");
const adminRouter = require("./router/adminRouter");
app.use(customerRouter);
app.use(adminRouter);

app.listen(90);

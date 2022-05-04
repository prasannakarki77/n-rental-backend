const express = require("express");

const app = express();
app.use(express.json());

// Importing DB Connection
require("./db_connection/dbconnection");

//Importing Router // Modules are already in routes
const customerRouter = require("./router/customerRouter");
app.use(customerRouter);

app.listen(90);

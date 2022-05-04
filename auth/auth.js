const jwt = require("jsonwebtoken");
const customer = require("../models/customerModel");
const admin = require("../models/adminModel");

// Customer Guard
module.exports.customerGuard = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, "nrental");
    console.log(data);
    customer
      .findOne({
        _id: data.customerId,
      })
      .then((cdata) => {
        req.customerInfo = cdata;
        next();
      })
      .catch((e) => {
        res.json({ msg: "Invalid token" });
      });
  } catch (e) {
    res.json({ msg: "Invalid token" });
  }
};


// Admin Guard
module.exports.adminGuard = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, "nrental");
    console.log(data);
    admin
      .findOne({
        _id: data.adminId,
      })
      .then((adata) => {
        req.adminInfo = adata;
        next();
      })
      .catch((e) => {
        res.json({ msg: "Invalid token" });
      });
  } catch (e) {
    res.json({ msg: "Invalid token" });
  }
};

const jwt = require("jsonwebtoken");
const customer1 = require("../models/customerModel");

module.exports.customerGuard = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, "nrental");
    console.log(data);
    customer1
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
    res.json({ msg: "Invalid token" });
  } catch (e) {}
};

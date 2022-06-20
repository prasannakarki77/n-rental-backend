const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const admin = require("../models/adminModel");

// User Guard
module.exports.userGuard = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, "nrental");
    // console.log(data);
    User.findOne({
      _id: data.userId,
    })
      .then((user_data) => {
        req.userInfo = user_data;
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
    // console.log(data);
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

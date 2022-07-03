const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const router = new express.Router();
const auth = require("../auth/auth");
const upload = require("../upload/upload");

//Importing Model
const User = require("../models/userModel");

router.post("/user/register", (req, res) => {
  const username = req.body.username;
  User.findOne({ username: username })
    .then((user_data) => {
      if (user_data != null) {
        res.json({ msg: "username already exist" });
        return;
      }
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const address = req.body.address;
      const phone = req.body.phone;
      const gender = req.body.gender;
      const email = req.body.email;
      const password = req.body.password;

      bcryptjs.hash(password, 10, (e, hashed_pw) => {
        const data = new User({
          firstname: firstname,
          lastname: lastname,
          address: address,
          phone: phone,
          gender: gender,
          username: username,
          email: email,
          password: hashed_pw,
          userType: "user",
        });
        data
          .save()
          .then(() => {
            res.json({ msg: "Registered" });
          })
          .catch((e) => {
            res.json({ e });
          });
      });
    })
    .catch();
});

// For login

router.post("/user/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username })
    .then((user_data) => {
      if (user_data == null) {
        res.json({ msg: "Invalid Credentials" });
        return;
      }
      bcryptjs.compare(password, user_data.password, (e, result) => {
        if (result == false) {
          res.json({ msg: "Invalid Credential" });
          return;
        }
        // Creating token for logged in user
        const token = jwt.sign({ userId: user_data._id }, "nrental");
        res.json({ token: token, userType: user_data.userType });
      });
    })
    .catch();
});

// for testing token
router.delete("/booking/delete", auth.userGuard, (req, res) => {
  res.json({ msg: "booking deleted" });
});

// Dashboard router for admin
router.get("/user/dashboard", auth.userGuard, (req, res) => {
  //console.log(req.adminInfo.full_name);
  // res.json(req.adminInfo)
  res.json({
    firstname: req.userInfo.firstname,
    lastname: req.userInfo.lastname,
    address: req.userInfo.address,
    phone: req.userInfo.phone,
    gender: req.userInfo.gender,
    username: req.userInfo.username,
    email: req.userInfo.email,
  });
});

router.put(
  "/user/update_profile_img",
  auth.userGuard,
  upload.single("user_img"),
  (req, res) => {
    console.log(req.file);
    if (req.file == undefined) {
      return res.json({ msg: "Invalid file type" });
    }
    User.updateOne(
      { _id: req.userInfo._id },
      { profile_img: req.file.filename }
    )
      .then()
      .catch();
  }
);

module.exports = router;

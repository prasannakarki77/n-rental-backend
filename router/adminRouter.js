const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = new express.Router();
const auth = require("../auth/auth");

//Importing Model
const Admin = require("../models/adminModel");

router.post("/admin/register", (req, res) => {
  const username = req.body.username;
  Admin.findOne({ username: username })
    .then((admin_data) => {
      if (admin_data != null) {
        res.json({ msg: "username already exist" });
        return;
      }
      const full_name = req.body.full_name;
      const address = req.body.address;
      const contact_no = req.body.contact_no;
      const gender = req.body.gender;
      const email = req.body.email;
      const password = req.body.password;

      bcryptjs.hash(password, 10, (e, hashed_pw) => {
        const data = new Admin({
          full_name: full_name,
          address: address,
          contact_no: contact_no,
          gender: gender,
          username: username,
          email: email,
          password: hashed_pw,
        });
        data
          .save()
          .then(() => {
            res.json({ msg: "Admin Registered" });
          })
          .catch((e) => {
            res.json({ e });
          });
      });
    })
    .catch();
});

// For login

router.post("/admin/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  Admin.findOne({ username: username })
    .then((admin_data) => {
      if (admin_data == null) {
        res.json({ msg: "Invalid Credentials" });
        return;
      }
      bcryptjs.compare(password, admin_data.password, (e, result) => {
        if (result == false) {
          res.json({ msg: "Invalid Credential" });
          return;
        }
        // Creating token for logged in user
        const token = jwt.sign({ adminId: admin_data._id }, "nrental");
        res.json({ token: token });
      });
    })
    .catch();
});

// for testing token (router for vehicle insert by admin)
// router.post("/vehicle/insert", auth.adminGuard, (req, res) => {
//   res.json({ msg: "vehicle added deleted" });
// });

module.exports = router;

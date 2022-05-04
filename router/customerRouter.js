const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const router = new express.Router();
const auth = require("../auth/auth");

//Importing Model
const Customer = require("../models/customerModel");

router.post("/customer/insert", (req, res) => {
  const username = req.body.username;
  Customer.findOne({ username: username })
    .then((cust_data) => {
      if (cust_data != null) {
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
        const data = new Customer({
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

router.post("/customer/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  Customer.findOne({ username: username })
    .then((cust_data) => {
      if (cust_data == null) {
        res.json({ msg: "Invalid Credentials" });
        return;
      }
      bcryptjs.compare(password, cust_data.password, (e, result) => {
        if (result == false) {
          res.json({ msg: "Invalid Credential" });
          return;
        }
        // Creating token for logged in user
        const token = jwt.sign({ customerId: cust_data._id }, "nrental");
        res.json({ token: token });
      });
    })
    .catch();
});

// for testing token
router.delete("/booking/delete", auth.customerGuard, (req, res) => {
  res.json({ msg: "booking deleted" });
});

module.exports = router;

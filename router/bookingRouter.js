const express = require("express");
const router = new express.Router();
const Booking = require("../models/bookingModel");
const auth = require("../auth/auth");

router.post("/booking/add/:vehicle_id", auth.userGuard, (req, res) => {
  const user_id = req.userInfo._id;
  const vehicle_id = req.params.vehicle_id;
  const data = new Booking({
    user_id: user_id,
    vehicle_id: vehicle_id,
    no_of_days: req.body.no_of_days,
    booking_date: req.body.booking_date,
    booking_time: req.body.booking_time,
    address: req.body.address,
    contact_no: req.body.contact_no,
    status: "renting",
  });
  data
    .save()
    .then(() => res.status(201).json({ msg: "Vehicle Booked ", success: true }))
    .catch((e) => res.json({ msg: e }));
});

router.delete("/booking/delete/:id", auth.userGuard, (req, res) => {
  Booking.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).json({ msg: "Booking Deleted ", success: true });
    })
    .catch((e) => {
      res.json({ e });
    });
});

router.get("/user/booking/get", auth.userGuard, (req, res) => {
  Booking.find({ user_id: req.userInfo._id })
    .populate("vehicle_id")
    .then((booking) => {
      if (booking != null) {
        res.status(201).json({
          success: true,
          data: booking,
        });
      }
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});
router.get("/booking/get", auth.userGuard, (req, res) => {
  Booking.find()
    .populate("vehicle_id")
    .then((booking) => {
      if (booking != null) {
        res.status(201).json({
          success: true,
          data: booking,
        });
      }
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

router.put("/booking/update/:id", auth.userGuard, (req, res) => {
  Booking.updateOne(
    { _id: req.params.id },
    {
      no_of_days: req.body.no_of_days,
      booking_date: req.body.booking_date,
      booking_time: req.body.booking_time,
      address: req.body.address,
      contact_no: req.body.contact_no,
    }
  )
    .then(() => {
      res.status(201).json({ msg: "Booking updated", success: true });
    })
    .catch((e) => {
      res.json({ e });
    });
});
module.exports = router;

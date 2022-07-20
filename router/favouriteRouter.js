const express = require("express");
const router = new express.Router();
const Favourite = require("../models/favouriteModel");
const auth = require("../auth/auth");

router.post("/favourite/insert/:vehicle_id", auth.userGuard, (req, res) => {
  const user_id = req.userInfo._id;
  const vehicle_id = req.params.vehicle_id;
  const data = new Favourite({
    user_id: user_id,
    vehicle_id: vehicle_id,
  });
  data
    .save()
    .then(() =>
      res.status(201).json({ msg: "Added to favourites", success: true })
    )
    .catch((e) => res.json({ msg: e }));
});

router.delete("/favourite/delete/:id", auth.userGuard, (req, res) => {
  Favourite.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).json({ msg: "Deleted from favourites", success: true });
    })
    .catch((e) => {
      res.json({ msg: e });
    });
});

router.get("/favourite/get", auth.userGuard, (req, res) => {
  Favourite.find({ user_id: req.userInfo._id })
    .populate("vehicle_id")
    .then((favourite) => {
      if (favourite != null) {
        res.status(201).json({
          success: true,
          data: favourite,
        });
      }
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

module.exports = router;

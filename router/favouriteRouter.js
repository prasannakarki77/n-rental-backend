const express = require("express");
const router = new express.Router();
const Favourite = require("../models/favouriteModel");
const auth = require("../auth/auth");

router.post("/favourite/insert/:vehicle_id", auth.userGuard, (req, res) => {
  const user_id = req.userInfo.user_id;
  const vehicle_id = req.params.vehicle_id;
  const data = new Favourite({
    user_id: user_id,
    vehicle_id: vehicle_id,
  });
  data
    .save()
    .then(() => res.json({ msg: "Added to favourites" }))
    .catch((e) => res.json({ msg: e }));
});

router.delete("/favourite/delete/:id", auth.userGuard, (req, res) => {
  Favourite.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json("Removed from favourite");
    })
    .catch((e) => {
      res.json({ e });
    });
});

module.exports = router;

const express = require("express");
const router = new express.Router();
const Vehicle = require("../models/vehicleModel");
const auth = require("../auth/auth");
const upload = require("../upload/upload");
// route to insert vehicle by admin
router.post(
  "/vehicle/insert",
  auth.adminGuard,
  upload.single("v_img"),
  (req, res) => {
    const vehicle_name = req.body.vehicle_name;
    const vehicle_category = req.body.vehicle_category;
    const vehicle_company = req.body.vehicle_company;
    const vehicle_desc = req.body.vehicle_desc;
    const booking_cost = req.body.booking_cost;
    const vehicle_sku = req.body.vehicle_sku;
    const vehicle_image = req.file.filename;
    // const userId = req.customerInfo._id;
    const data = new Vehicle({
      vehicle_name: vehicle_name,
      vehicle_category: vehicle_category,
      vehicle_company: vehicle_company,
      vehicle_desc: vehicle_desc,
      vehicle_sku: vehicle_sku,
      booking_cost: booking_cost,
      vehicle_image: vehicle_image,
      //   userId: userId
    });
    data
      .save()
      .then(() => {
        res.json({ msg: "Vehicle added", success: true });
      })
      .catch((e) => {
        res.json({ e });
      });
  }
);
router.put(
  "/vehicle/update",
  auth.adminGuard,
  upload.single("v_img"),
  (req, res) => {
    console.log(req.file);
    if (req.file == undefined) {
      return res.json({ msg: "Invalid file type" });
    }
    Vehicle.updateOne(
      { _id: req.body._id },
      {
        vehicle_name: req.body.vehicle_name,
        vehicle_image: req.file.filename,
        vehicle_desc: req.body.vehicle_desc,
        vehicle_company: req.body.vehicle_company,
      }
    )
      .then(() => {
        res.json({ msg: "vehicle update", success: true });
      })
      .catch((e) => {
        res.json({ e });
      });
  }
);

router.delete("/vehicle/delete/:id", auth.adminGuard, (req, res) => {
  Vehicle.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json("vehicle deleted");
    })
    .catch((e) => {
      res.json({ e });
    });
});

router.get("/vehicle/get", (req, res) => {
  Vehicle.find()
    .then((vehicle) => {
      if (vehicle != null) {
        res.status(201).json({
          success: true,

          data: vehicle,
        });
      }
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

router.get("/vehicle/dashboard", auth.adminGuard, async (req, res) => {
  const vehicleList = await Vehicle.find({});
  res.json({
    success: true,
    data: vehicleList,
  });
});
module.exports = router;

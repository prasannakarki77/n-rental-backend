const express = require("express");
const router = new express.Router();
const Vehicle = require("../models/vehicleModel");
const auth = require("../auth/auth");
const upload = require("../upload/upload");

router.post(
  "/vehicle/insert",
  auth.userGuard,
  upload.single("v_img"),
  (req, res) => {
    const vehicle_name = req.body.vehicle_name;
    const vehicle_category = req.body.vehicle_category;
    const vehicle_company = req.body.vehicle_company;
    const vehicle_desc = req.body.vehicle_desc;
    const vehicle_rich_desc = req.body.vehicle_rich_desc;
    const is_featured = req.body.is_featured;
    const booking_cost = req.body.booking_cost;
    const vehicle_sku = req.body.vehicle_sku;
    const vehicle_image = req.file.filename;
    const data = new Vehicle({
      vehicle_name: vehicle_name,
      vehicle_category: vehicle_category,
      vehicle_company: vehicle_company,
      vehicle_desc: vehicle_desc,
      vehicle_rich_desc: vehicle_rich_desc,
      is_featured: is_featured,
      vehicle_sku: vehicle_sku,
      booking_cost: booking_cost,
      vehicle_image: vehicle_image,
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
  "/vehicle/update_image",
  auth.userGuard,
  upload.single("v_img"),
  (req, res) => {
    console.log(req.file);
    if (req.file == undefined) {
      return res.json({ msg: "Invalid file type" });
    }
    Vehicle.updateOne(
      { _id: req.body._id },
      {
        vehicle_image: req.file.filename,
      }
    )
      .then(() => {
        res.json({ msg: "vehicle image updated", success: true });
      })
      .catch((e) => {
        res.json({ e });
      });
  }
);

router.put("/vehicle/update", auth.userGuard, (req, res) => {
  Vehicle.updateOne(
    { _id: req.body._id },
    {
      vehicle_name: req.body.vehicle_name,
      vehicle_desc: req.body.vehicle_desc,
      vehicle_rich_desc: req.body.vehicle_rich_desc,
      is_featured: req.body.is_featured,
      vehicle_company: req.body.vehicle_company,
      vehicle_category: req.body.vehicle_category,
      vehicle_sku: req.body.vehicle_sku,
      booking_cost: req.body.booking_cost,
    }
  )
    .then(() => {
      res.status(201).json({ msg: "vehicle updated", success: true });
    })
    .catch((e) => {
      res.json({ e });
    });
});

router.delete("/vehicle/delete/:id", auth.userGuard, (req, res) => {
  Vehicle.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).json({
        success: true,
        msg: "vehicle deleted",
      });
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
router.get("/vehicle/filter/:category", (req, res) => {
  Vehicle.find({ vehicle_category: req.params.category })
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
router.get("/vehicle/get/featured", (req, res) => {
  Vehicle.find({ is_featured: true })
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

router.get("/vehicle/dashboard", auth.userGuard, async (req, res) => {
  const vehicleList = await Vehicle.find({});
  res.json({
    success: true,
    data: vehicleList,
  });
});

router.get("/vehicle/:id", (req, res) => {
  Vehicle.findOne({ _id: req.params.id })

    .then((data) => {
      res.status(201).json({ success: true, data: data });
    })

    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});
module.exports = router;

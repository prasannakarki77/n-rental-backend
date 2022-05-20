const express = require("express");
const router = new express.Router();
const Category = require("../models/categoryModel");
const auth = require("../auth/auth");
const upload = require("../upload/upload");

router.post(
  "/category/insert",
  auth.adminGuard,
  upload.single("c_img"),
  (req, res) => {
    const category_name = req.body.category_name;
    const category_image = req.file.filename;
    const data = new Category({
      category_name: category_name,
      category_image: category_image,
    });
    data
      .save()
      .then(() => res.json({ msg: "Category added" }))
      .catch((e) => res.json({ msg: e }));
  }
);

router.put(
  "/category/update",
  auth.adminGuard,
  upload.single("c_img"),
  (req, res) => {
    console.log(req.file);
    if (req.file == undefined) {
      return res.json({ msg: "Invalid file type" });
    }
    Category.updateOne(
      { _id: req.body._id },
      {
        category_name: req.body.category_name,
        category_image: req.file.filename,
      }
    )
      .then(() => {
        res.json({ msg: "Category update" });
      })
      .catch((e) => {
        res.json({ e });
      });
  }
);

router.delete("/category/delete/:id", auth.adminGuard, (req, res) => {
  Category.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json("Category deleted");
    })
    .catch((e) => {
      res.json({ e });
    });
});

module.exports = router;

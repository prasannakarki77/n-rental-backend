const express = require("express");
const router = new express.Router();
const Article = require("../models/articleModel");
const auth = require("../auth/auth");
const upload = require("../upload/upload");

router.post(
  "/article/insert",
  auth.adminGuard,
  upload.single("a_img"),
  (req, res) => {
    const data = new Article({
      title: req.body.title,
      date: req.body.date,
      description: req.body.description,
      rich_description: req.body.rich_description,
      image: req.file.filename,
    });
    data
      .save()
      .then(() => {
        res.json({ msg: "Article added", success: true });
      })
      .catch((e) => {
        res.json({ e });
      });
  }
);

router.put(
  "/article/update_image",
  auth.adminGuard,
  upload.single("a_img"),
  (req, res) => {
    console.log(req.file);
    if (req.file == undefined) {
      return res.json({ msg: "Invalid file type" });
    }
    Article.updateOne(
      { _id: req.body._id },
      {
        image: req.file.filename,
      }
    )
      .then(() => {
        res.json({ msg: "article image updated", success: true });
      })
      .catch((e) => {
        res.json({ e });
      });
  }
);

router.put("/article/update", auth.userGuard, (req, res) => {
  Article.updateOne(
    { _id: req.body._id },
    {
      title: req.body.title,
      date: req.body.date,
      description: req.body.description,
      rich_description: req.body.rich_description,
    }
  )
    .then(() => {
      res.json({ msg: "article updated", success: true });
    })
    .catch((e) => {
      res.json({ e });
    });
});

router.delete("/article/delete/:id", auth.adminGuard, (req, res) => {
  Article.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json({
        success: true,
        msg: "article deleted",
      });
    })
    .catch((e) => {
      res.json({ e });
    });
});

router.get("/article/dashboard", (req, res) => {
  Article.find()
    .then((articleList) => {
      if (articleList != null) {
        res.status(201).json({
          success: true,

          data: articleList,
        });
      }
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

// router.get("/article/dashboard", auth.adminGuard, async (req, res) => {
//   const articleList = await Article.find({});
//   res.json({
//     success: true,
//     data: articleList,
//   });
// });
module.exports = router;

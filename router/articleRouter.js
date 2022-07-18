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
      is_featured: req.body.is_featured,
    });
    console.log(data);
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

router.get("/article/single/:id", (req, res) => {
  Article.findOne({ _id: req.params.id })

    .then((data) => {
      res.json({ data: data });
    })

    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

router.put("/article/update", auth.userGuard, (req, res) => {
  Article.updateOne(
    { _id: req.body._id },
    {
      title: req.body.title,
      date: req.body.date,
      description: req.body.description,
      rich_description: req.body.rich_description,
      is_featured: req.body.is_featured,
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

router.get("/article/get", (req, res) => {
  Article.find()
    .then((article) => {
      if (article != null) {
        res.status(201).json({
          success: true,

          data: article,
        });
      }
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});
router.get("/article/get/featured", (req, res) => {
  Article.find({ is_featured: true })
    .then((article) => {
      if (article != null) {
        res.status(201).json({
          success: true,

          data: article,
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

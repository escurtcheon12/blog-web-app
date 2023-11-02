const express = require("express");
const router = express.Router();

const blogsController = require("../controller/blogsController");

const multer = require("multer");
const path = require("path");

// const upload = multer({ dest: "../public/uploads/blogs" });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads/blogs"));
  },

  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const maxSize = 1 * 1024 * 1024;

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png .jpg and .jpeg format allowed"));
    }
  },
  limits: { fileSize: maxSize },
});

router.get("/", blogsController.index);
router.get("/getBlogViewer", blogsController.getBlogViewer);
router.get("/getBlogPublish", blogsController.getBlogPublish);
router.get("/countViewer", blogsController.countViewer);
router.get("/categories/:id", blogsController.getCategoryId);
router.get("/create", blogsController.create);
router.post("/", upload.single("file_image"), blogsController.store);
router.get("/:id", blogsController.getId);
router.put("/:id", upload.single("file_image"), blogsController.update);
router.put(
  "/updateWithoutImage/:id",
  upload.single("file_image"),
  blogsController.updateWithoutImage
);
router.post("/addView", blogsController.addView);
router.delete("/:id", blogsController.destroy);
router.post("/count", blogsController.count);
router.post("/countDrafts", blogsController.countDrafts);
router.post("/countPublished", blogsController.countPublished);

module.exports = router;

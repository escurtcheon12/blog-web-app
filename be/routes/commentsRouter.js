const express = require("express");
const router = express.Router();
const commentsController = require("../controller/commentsController");

router.get("/", commentsController.index);
router.get("/getBlogId", commentsController.getBlogId);
router.get("/create", commentsController.create);
router.post("/", commentsController.store);
router.get("/:id", commentsController.getId);
router.put("/:id", commentsController.update);
router.delete("/:id", commentsController.destroy);
router.post("/count", commentsController.count);
router.post("/countUnread", commentsController.countUnread);
router.post("/updateRead", commentsController.updateRead);
module.exports = router;

const express = require("express");
const router = express.Router();
const categoriesController = require("../controller/categoriesController");

router.get("/", categoriesController.index);
router.get("/create", categoriesController.create);
router.post("/", categoriesController.store);
router.get("/:id", categoriesController.getId);
router.put("/:id", categoriesController.update);
router.delete("/:id", categoriesController.destroy);
router.post("/count", categoriesController.count);
module.exports = router;

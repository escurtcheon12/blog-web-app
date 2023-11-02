const express = require("express");
const router = express.Router();
const viewersController = require("../controller/viewersController");

router.get("/", viewersController.index);
router.get("/create", viewersController.create);
router.post("/", viewersController.store);
router.get("/:id", viewersController.getId);
router.put("/:id", viewersController.update);
router.delete("/:id", viewersController.destroy);
router.post("/count", viewersController.count);
module.exports = router;

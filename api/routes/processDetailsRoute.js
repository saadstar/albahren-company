const express = require("express");
const router = express.Router();
const {
  createProcessDetails,
  allProcessDetails,
  deleteProcessDetail,
} = require("../controllers/processDetailsController");

router.post("/", createProcessDetails);
router.get("/:processId", allProcessDetails);
router.delete("/:id", deleteProcessDetail);

module.exports = router;

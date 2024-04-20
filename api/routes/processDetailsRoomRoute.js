const express = require("express");
const router = express.Router();
const {
  createProcessDetailsRoom,
  allProcessDetailsRoom,
  deleteProcessDetailsRoom,
} = require("../controllers/processDetailsRoomController");

router.post("/", createProcessDetailsRoom);
router.get("/:processId", allProcessDetailsRoom);
router.delete("/:id", deleteProcessDetailsRoom);

module.exports = router;

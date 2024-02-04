const express = require("express");
const router = express.Router();
const {
  createProcess,
  singleProcess,
  allProcess,
  editProcess,
} = require("../controllers/processController");

router.post("/",createProcess);
router.get("/", allProcess);
router.get("/:id", singleProcess);
router.put("/:id", editProcess);

module.exports = router;
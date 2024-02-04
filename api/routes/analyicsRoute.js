const express = require("express");
const router = express.Router();
const {
  createAnalyics,
  allAnalyics,
  aAnalyics,
} = require("../controllers/analyicsController");

router.post("/", createAnalyics);
router.get("/", allAnalyics);
router.get("/:id", aAnalyics);

module.exports = router;

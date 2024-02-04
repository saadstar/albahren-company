const express = require("express");
const router = express.Router();
const {
  createAnalyicsDetails,
  singleAnalyicsDetails,
} = require("../controllers/analyicsDetailsController");

router.post("/", createAnalyicsDetails);
router.get("/:dataNum/:analyicsId", singleAnalyicsDetails);

module.exports = router;

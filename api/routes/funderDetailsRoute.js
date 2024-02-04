const express = require("express");
const router = express.Router();
const {
  createFunderDetails,
  allFunderDetails,
  deleteFunderDetail,
}= require("../controllers/funderDetailsController");

// @POST create a new funder details
router.post("/", createFunderDetails);

// @GET fetch all funder details
router.get("/:funderCompanyId", allFunderDetails);

// @GET fetch all funder details
router.delete("/:id", deleteFunderDetail);

module.exports = router;

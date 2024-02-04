const express = require("express");
const router = express.Router();
const {
  createFunderCompany,
  allFunderCompanies,
} = require("../controllers/funderCompanyController");

// @POST create a new funder company
router.post("/", createFunderCompany);

// @GET fetch all funder companies
router.get("/", allFunderCompanies);

module.exports = router;

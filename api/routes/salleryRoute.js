const express = require("express");
const router = express.Router();
const {
  createSallery,
  allSalleries,
  deleteSallery,
} = require("../controllers/salleryController");

// @POST create a new sallery
router.post("/", createSallery);

// @GET fetch all salleries
router.get("/", allSalleries);

// @DELETE delete sallery by id
router.delete("/:id", deleteSallery);

module.exports = router;

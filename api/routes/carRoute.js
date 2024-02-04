const express = require("express");
const router = express.Router();
const {
  createCar,
  allCars,
} = require("../controllers/carController");

// @POST create a new car movement 
router.post("/", createCar);
// @GET fetch all car movments 
router.get("/", allCars);

module.exports = router;

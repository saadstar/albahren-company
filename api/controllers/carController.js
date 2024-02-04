const asyncHandler = require("express-async-handler");
const Car = require("../modals/CarModel");

// Add New car movement @POST
const createCar = asyncHandler(async (req, res) => {
  try {
    const newCar = new Car(req.body);
    const savedCar = await newCar.save();
    res.status(200).json(savedCar);
  } catch (err) {
    res.status(505).json(err);
  }
});
// get All Cars @GET
const allCars = asyncHandler(async (req, res) => {
  try {
    const oneCar = await Car.find();
    res.status(200).json(oneCar);
  } catch (err) {
    res.status(505).json(err);
  }
});

module.exports = { createCar, allCars };

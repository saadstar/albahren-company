const asyncHandler = require("express-async-handler");
const Car = require("../modals/CarModel");
const FunderCompany = require("../modals/FunderCompanyModel");

// Add New car movement @POST
const createFunderCompany = asyncHandler(async (req, res) => {
  try {
    const newCompany = new FunderCompany(req.body);
    const savedCompany = await newCompany.save();
    res.status(200).json(savedCompany);
  } catch (err) {
    res.status(505).json(err);
  }
});
// get All Cars @GET
const allFunderCompanies = asyncHandler(async (req, res) => {
  try {
    const fetchAll = await FunderCompany.find();
    res.status(200).json(fetchAll);
  } catch (err) {
    res.status(505).json(err);
  }
});

module.exports = { createFunderCompany, allFunderCompanies };

const asyncHandler = require("express-async-handler");
const Analyics = require("../modals/AnalyicsModel");

// Add New Process @POST
const createAnalyics = asyncHandler(async (req, res) => {
  try {
    const newAnalyics = new Analyics(req.body);
    const savenewAnalyics = await newAnalyics.save();
    res.status(200).json(savenewAnalyics);
  } catch (err) {
    res.status(505).json(err);
  }
});
// get All Process @GET
const allAnalyics = asyncHandler(async (req, res) => {
  try {
    const oneProcess = await Analyics.find();
    res.status(200).json(oneProcess);
  } catch (err) {
    res.status(505).json(err);
  }
});
// get an Process @GET  by id
const aAnalyics = asyncHandler(async (req, res) => {
  try {
    const oneAnalyics = await Analyics.findById(req.params.id);
    res.status(200).json(oneAnalyics);
  } catch (err) {
    res.status(505).json(err);
  }
});
module.exports = { createAnalyics, allAnalyics, aAnalyics };

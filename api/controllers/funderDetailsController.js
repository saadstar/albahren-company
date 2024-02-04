const asyncHandler = require("express-async-handler");
const Funder = require("../modals/FunderDetailsModel");

const createFunderDetails = asyncHandler(async (req, res) => {
  try {
    const funderDetaile = new Funder(req.body);
    const savedFunderDetails = await funderDetaile.save();
    res.status(200).json(savedFunderDetails);
  } catch (err) {
    res.status(505).json(err);
  }
});

const allFunderDetails = asyncHandler(async (req, res) => {
  try {
    const detailer = await Funder.find({
      funderCompanyId: req.params.funderCompanyId,
    });
    res.status(200).json(detailer);
  } catch (err) {
    res.status(505).json(err);
  }
});

const deleteFunderDetail = asyncHandler(async (req, res) => {
  try {
    await Funder.findByIdAndDelete(req.params.id);
    res.status(200).json("Funder detail Deleted Successfuly.");
  } catch (err) {
    res.status(505).json(err);
  }
});

module.exports = {
  createFunderDetails,
  allFunderDetails,
  deleteFunderDetail,
};

const asyncHandler = require("express-async-handler");
const Sallery = require("../modals/SalleryModel");

const createSallery = asyncHandler(async (req, res) => {
  try {
    const newSallery = new Sallery(req.body);
    const savednewSallery = await newSallery.save();
    res.status(200).json(savednewSallery);
  } catch (err) {
    res.status(505).json(err);
  }
});

const allSalleries = asyncHandler(async (req, res) => {
  try {
    const fetchAllSalleries = await Sallery.find();
    res.status(200).json(fetchAllSalleries);
  } catch (err) {
    res.status(505).json(err);
  }
});

const deleteSallery = asyncHandler(async (req, res) => {
  try {
    await Sallery.findByIdAndDelete(req.params.id);
    res.status(200).json("Sallery Deleted Successfuly.");
  } catch (err) {
    res.status(505).json(err);
  }
});

module.exports = {
  createSallery,
  allSalleries,
  deleteSallery,
};

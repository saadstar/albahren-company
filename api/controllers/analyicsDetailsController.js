const asyncHandler = require("express-async-handler");
const AnalyicsDetails = require("../modals/AnalyicsDetailsModel");

const createAnalyicsDetails = asyncHandler(async (req, res) => {
  try {
    const analyicsDetaile = new AnalyicsDetails(req.body);
    const savedProcessDetails = await analyicsDetaile.save();
    res.status(200).json(savedProcessDetails);
  } catch (err) {
    res.status(505).json(err);
  }
});
const singleAnalyicsDetails = asyncHandler(async (req, res) => {
  try {
    const detailer = await AnalyicsDetails.find({
      analyicsId: req.params.analyicsId,
      dataNum: req.params.dataNum,
    });
    res.status(200).json(detailer);
  } catch (err) {
    res.status(505).json(err);
  }
});
module.exports = {
  createAnalyicsDetails,
  singleAnalyicsDetails,
};

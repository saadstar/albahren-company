const asyncHandler = require("express-async-handler");
const ProcessDetailRoom = require("../modals/ProcessDetailsRooms");

const createProcessDetailsRoom = asyncHandler(async (req, res) => {
  try {
    const processDetaile = new ProcessDetailRoom(req.body);
    const savedProcessDetails = await processDetaile.save();
    res.status(200).json(savedProcessDetails);
  } catch (err) {
    res.status(505).json(err);
  }
});

const allProcessDetailsRoom = asyncHandler(async (req, res) => {
  try {
    const detailer = await ProcessDetailRoom.find({
      processId: req.params.processId,
    });
    res.status(200).json(detailer);
  } catch (err) {
    res.status(505).json(err);
  }
});

const deleteProcessDetailsRoom = asyncHandler(async (req, res) => {
  try {
    await ProcessDetailRoom.findByIdAndDelete(req.params.id);
    res.status(200).json("Process detail Deleted Successfuly.");
  } catch (err) {
    res.status(505).json(err);
  }
});

module.exports = {
  createProcessDetailsRoom,
  allProcessDetailsRoom,
  deleteProcessDetailsRoom,
};

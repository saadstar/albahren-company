const asyncHandler = require("express-async-handler");
const Save = require("../modals/SaveModel");

const createSaveItem = asyncHandler(async (req, res) => {
    try {
        const newSaveItem = new Save({
          ...req.body,
          filename: req.file.filename,
        });
        const savedSaveItem = await newSaveItem.save();
        res.status(200).json(savedSaveItem);
    } catch (err) {
        res.status(500).json(err);
    }
})

const saveItems = asyncHandler(async(req, res) => {
    try {
        const allItems = await Save.find({});
        res.status(200).json(allItems);
    } catch (err) {
        res.status(500).json(err);
    }
})

const singleSaveItem=asyncHandler(async(req,res)=>{
    try {
        const saveItem = await Save.findById(req.params.id);
        res.status(200).json(saveItem);
    } catch (err) {
        res.status(500).json(err);
    }
})

const deleteSaveItem = asyncHandler(async (req, res) => {
  try {
    await Save.findByIdAndDelete(req.params.id);
    res.status(200).json("Save Item has Deleted Successfuly.");
  } catch (err) {
    res.status(505).json(err);
  }
});

module.exports = { createSaveItem, saveItems, singleSaveItem, deleteSaveItem };
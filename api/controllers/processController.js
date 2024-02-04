const asyncHandler = require("express-async-handler");
const Process = require("../modals/ProcessModal");

// Add New Process @POST
const createProcess = asyncHandler(async (req, res) => {
    try {
        const newProcess = new Process(req.body);
        const savedProcess = await newProcess.save();
        res.status(200).json(savedProcess);
    } catch (err) {
        res.status(505).json(err);
    }
})
// get All Process @GET 
const allProcess = asyncHandler(async (req, res) => {
    try {
        const oneProcess = await Process.find();
        res.status(200).json(oneProcess);
    } catch (err) {
        res.status(505).json(err);
    }
})
// getProcessByid @GET /:id
const singleProcess = asyncHandler(async (req, res) => {
    try {
      const getProcessByid=await Process.findById(req.params.id)
        res.status(200).json(getProcessByid);
    } catch (err) {
        res.status(505).json(err);
    }
})
// editProcessByid @PUT /:id
const editProcess = asyncHandler(async (req, res) => {
  try {
    const getProcessByid = await Process.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
    res.status(200).json(getProcessByid);
  } catch (err) {
    res.status(505).json(err);
  }
});



module.exports = { createProcess, singleProcess, allProcess, editProcess };
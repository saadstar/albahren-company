const asyncHandler = require("express-async-handler");
const Store = require("../modals/StoreModal");


// @POST create new store item 
const createStore = asyncHandler(async (req, res) => {
    try {
        const newStore = new Store({
          ...req.body,
          filename: req.file.filename,
          filepath: req.file.path,
        });
        const savedStore = await newStore.save();
        res.status(200).json(savedStore);
    } catch (err) {
        res.status(500).json(err);
    }
});

// @GET fetch all store items 
const storeItems = asyncHandler(async (req, res) => {
    try {
        const allItems = await Store.find();
        res.status(200).json(allItems)
    } catch (err) {
        res.status(500).json(err);
    }
});

// @DELETE delete a store item   by ID
const deleteStoreItem = asyncHandler(async (req, res) => {
    try {
        await Store.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted Sucessfuly.");
    } catch (err) {
        res.status(500).json(err);
    }
});
// @PUT edit a store item        by ID
const editStoreItem = asyncHandler(async (req, res) => {
    try {
        const edited = await Store.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(edited);
    } catch (err) {
        res.status(500).json(err);
    }
});
// @GET fetch a store item      by ID 
const singleStoreItem = asyncHandler(async (req, res) => {
    try {
        const oneItem = await Store.findById(req.params.id);
        res.status(200).json(oneItem);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports={createStore,storeItems,deleteStoreItem,editStoreItem,singleStoreItem}
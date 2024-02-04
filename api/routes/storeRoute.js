const express = require("express");
const router = express.Router();
const { createStore, storeItems, deleteStoreItem, editStoreItem, singleStoreItem } = require("../controllers/storeController");
const multer = require("multer");
const path = require("path");

// /// multer for upload images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const upload = multer({ storage });

// @POST create new store item 
router.post("/", upload.single("file"), createStore);

// @GET fetch all store items
router.get("/", storeItems);

// @DELETE delete a store item       by ID
router.delete("/:id", deleteStoreItem);

// @PUT edit a store item            by ID
router.put("/:id", editStoreItem);

// @GET fetch a existing store item  by ID
router.get("/:id", singleStoreItem);


module.exports = router;
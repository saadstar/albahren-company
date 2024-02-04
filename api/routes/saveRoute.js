const express = require("express");
const router = express.Router();
const {
  createSaveItem,
  saveItems,
  singleSaveItem,
  deleteSaveItem,
} = require("../controllers/saveController");
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

// @POST create new save item     
router.post("/", upload.single('file'),createSaveItem);

// @GET fetch all save items   
router.get("/", saveItems);

// @GET fetch single save item     by Id
router.get("/:id", singleSaveItem)

// @DELETE a single save item     by Id
router.delete("/:id", deleteSaveItem);


module.exports = router;
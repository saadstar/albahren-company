const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SallerySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    salleryNum: {
        type: Number,
        required:true
    },
    added: {
      type: Number,
    },
    note: {
      type: String,
    },
    site: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sallery", SallerySchema);

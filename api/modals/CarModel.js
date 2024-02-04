const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    km: {
      type: Number,
      required: true
    },
    oil: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", CarSchema);

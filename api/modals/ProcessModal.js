const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProcessSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
      default:"https://www.pexels.com/photo/person-holding-pen-pointing-at-graph-590020/",
    },
    processIncome: {
      type:Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Process", ProcessSchema);
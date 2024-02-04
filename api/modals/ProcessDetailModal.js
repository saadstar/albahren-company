const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProcessDetailsSchema = new Schema(
  {
    processId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
    },
    precentage: {
      type: Number,
    },
    price: {
      type: Number,
    },
    note: {
      type: String,
    },
    value: {
      type:Number
    },
    other: {
      type:String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProcessDetail", ProcessDetailsSchema);

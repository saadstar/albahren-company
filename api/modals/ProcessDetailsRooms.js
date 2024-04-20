const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProcessDetailsRoomSchema = new Schema(
  {
    processId: {
      type: String,
      required: true,
    },
    feQuantity: {
      type: Number,
        },
   cementQuantity: {
      type: Number,
        },
    senQuantity: {
      type: Number,
        },
    sandQuantity: {
      type: Number,
        },
    workerQuantity: {
      type: Number,
        },
    coverQuantity: {
      type: Number,
        },
    azlQuantity: {
      type: Number,
        },
    other: {
      type: Number,
        },
    fePrice: {
      type: Number,
        },
    cementPrice: {
      type: Number,
        },
    senPrice: {
      type: Number,
        },
    sandPrice: {
      type: Number,
        },
    workerPrice: {
      type: Number,
        },
    coverPrice: {
      type: Number,
        },
    azlPrice: {
      type: Number,
        },
        value: {
        type:Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProcessDetailRoom", ProcessDetailsRoomSchema);

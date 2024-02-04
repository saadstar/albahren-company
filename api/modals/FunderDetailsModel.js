const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FunderSchema = new Schema(
  {
    funderCompanyId: {
      type: String,
      required: true,
        },
        name: {
            type: String,
            required:true,
      },
        quantity: {
            type: Number,
            required:true,
    },
    price: {
      type: Number,
      required:true,
        },
        recived: {
            type: String,
            required:true,
      },
        site: {
            type: String,
      },
        storeType: {
            type: String,
      },
        value: {
            type: Number,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Funder", FunderSchema);

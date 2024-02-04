const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FunderCompanySchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FunderCompany", FunderCompanySchema);

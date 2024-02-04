const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProcessDetailsSchema = new Schema({
    analyicsId: {
        type: String,
        required: true
    },
    dataNum: {
        type: Number,
        required: true
    },
    tubeNum: {
        type: Number,
        required: true
    },
    feNum: {
        type: Number,
        required: true
    },
    cementNum: {
        type: Number,
        required: true
    },
    sandNum: {
        type: Number,
        required: true
    },
    senNum: {
        type: Number,
        required: true
    },
    workerNum: {
        type: Number,
        required: true
    },
    roomNum: {
        type: Number,
        required: true
    },
    floorNum: {
        type: Number,
    },
    houseNum: {
        type: Number,
    },
    woodNum: {
        type: Number,
    },
    blindNum: {
        type: Number,
    },
    lockNum: {
        type: Number,
        required: true
    },
    waterNum: {
        type: Number,
    },
    value: {
        type: Number,
        required:true
    }
}, { timestamps: true });

module.exports = mongoose.model("AnalyicsDetails", ProcessDetailsSchema);
const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const SaveSchema = new Schema({
    name: {
        type: String,        
    },
    out: {
        type: Number,
    },
    inn: {
        type:Number
    },
    Value: {
        type:Number
    },
    proccessName: {
        type:String
    },
    recived: {
        type:String
    },
    filename: {
        type: String,
    }
}, { timestamps: true });




module.exports = mongoose.model("Save", SaveSchema);
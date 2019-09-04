const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//FORM NUMBER 5
const SendForServicingSchema = new Schema({
  sentotranactionno: String,
  sendtodate: Date,
  senttocaseid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bringin"
  },
  sentochallanno: String,
  sentocalltype: {
    type: String,
    default: "Internal"
  }, //Internal or External
  sentoremarks: String
});
module.exports = SendForServicing = mongoose.model(
  "sendforservicing",
  SendForServicingSchema
);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//FORM NUMBER 6
const ReceivedFromServicingSchema = new Schema({
  receivedtransactionno: String,
  receiveddate: Date,
  receivedcaseid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sendforservicing"
  },
  recievedremarks: String
});

module.exports = ReceivedFromServicing = mongoose.model(
  "receivedfromservicing",
  ReceivedFromServicingSchema
);
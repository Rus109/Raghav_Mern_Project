const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Call Type Schema
const CallTypeSchema = new Schema({
  calltype: {
    type: String
  },
  description: {
    type: String
  }
});
module.exports = CallType = mongoose.model("calltype", CallTypeSchema);

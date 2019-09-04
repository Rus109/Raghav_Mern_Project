const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Designation Type Schema
const DesignationSchema = new Schema({
  designation: {
    type: String
  },
  description: {
    type: String
  }
});
module.exports = Designation = mongoose.model("designation", DesignationSchema);

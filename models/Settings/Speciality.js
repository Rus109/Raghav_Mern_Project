const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Speciality Type Schema
const SpecialitySchema = new Schema({
  speciality: {
    type: String
  },
  description: {
    type: String
  }
});
module.exports = Speciality = mongoose.model("speciality", SpecialitySchema);

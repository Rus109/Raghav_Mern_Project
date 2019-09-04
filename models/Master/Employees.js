const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeesSchema = new Schema({
  name: { type: String },
  email: { type: String },
  speciality: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "speciality"
  },
  contactno: { type: Number },
  designation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "designation"
  },
  alternatecontactno: { type: Number },
  address: { type: String },
  employeeImage: { type: String },
  imageName: { type: String },
  date: { type: Date, default: Date.now() }
});

module.exports = Employees = mongoose.model("employees", EmployeesSchema);

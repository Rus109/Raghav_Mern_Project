const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InstallationSchema = new Schema({
  installrefno: { type: String },
  installdate: { type: Date },
  productdetails: [
{
  proregtn:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "proreg"
  },
  newserialno: String
}
  ],
  installedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employees"
  },

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer"
  },
  customertype: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customertype"
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customersubdepartment"
  },
  contactperson: { type: String },
  contactno: { type: Number },
  address: { type: String },
  remarks: { type: String },
  filename: { type: String },
  installdoc: { type: String }
});

module.exports = InstallationDetails = mongoose.model(
  "installation",
  InstallationSchema
);
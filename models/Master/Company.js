const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Company Schema
const CompanySchema = new Schema({
  companyname: {
    type: String
  },
  contactperson: {
    type: String
  },
  contactno: {
    type: Number
  },
  alternatecontactno: {
    type: Number
  },
  email: {
    type: String
  },
  fax: {
    type: Number
  },
  address: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Company = mongoose.model("company", CompanySchema);

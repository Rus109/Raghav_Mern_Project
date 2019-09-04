const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//CustomerSubDepartment Schema
const CustomerSubDepartmentSchema = new Schema({
  department: {
    type: String
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer'
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = CustomerSubDepartment = mongoose.model(
  "customersubdepartment",
  CustomerSubDepartmentSchema
);

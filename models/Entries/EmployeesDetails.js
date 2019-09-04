const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeesDetailsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  employeesinfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employees"
  },
  designation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "designation"
  },
  workingdays: Number,
  fathersname: String,
  pan: String,
  joiningdate: Date,
  gender: String,
  pfno: String,
  esino: String,
  branchname: String,
  department: String,
  paymode: String,
  bankname: String,
  acno: String,
  ifscno: String,

  //Earnings
  basicsalary: Number,
  extra: Number,
  totalEarnings: Number,

  //Days
  fixeddays: Number,
  presentdays: Number,
  absentdays: Number,
  leavedays: Number,
  holidays: Number,

  //Deductions
  pf: Number,
  esi: Number,
  professionaltax: Number,
  advance: Number,
  absentdeductions: Number,
  leavedeductions: Number,
  totalDeductions: Number,

  //Net pay Details
  netpay: Number,
  inwords: String,
  name: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = EmpDetails = mongoose.model(
  "empdetails",
  EmployeesDetailsSchema
);

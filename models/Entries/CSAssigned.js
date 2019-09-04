const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//FORM NUMBER 2
const AssignComplaintSchema = new Schema({
  assigncomplaintsdetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "complaint"
  },
  assignrefno: { type: String },
  assigndatetime: { type: Date },
  assignengineer: { type: mongoose.Schema.Types.ObjectId, ref: "employees" },
  assignremarks: { type: String },
  assign_productdetails: [
    {
      assign_pro: { type: mongoose.Schema.Types.ObjectId, ref: "proreg" },
      assignserialno: String
    }
  ]
});

module.exports = AssignComplaint = mongoose.model(
  "assigncomplaint",
  AssignComplaintSchema
);
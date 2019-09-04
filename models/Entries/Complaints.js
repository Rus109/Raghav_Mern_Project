const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//FORM NUMBER 1
const ComplaintSchema = new Schema({
  caseid: String,
  complaintdate: { type: Date },
  complainttime: { type: String },
  servicetype: {
    type: String
    //  In House or Onsite
  },
  calltype: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "calltype"
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer"
  },
  clienttype: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customertype"
  },
  departmentname: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customersubdepartment"
  },
  // Caller Details
  name: { type: String },
  designation: { type: String },
  contactno: { type: Number },
  persontovisit: { type: String },
  address: { type: String },
  problemdetails: { type: String },
  isresolvedonphone: {
    type: Boolean,
    default: false //false: Not Resolved,  true: Resolved
  },
  status: {
    type: String
    //Unassigned and Closed
  },
  remarks: String,
  complaints_pro_details: [
    {
      complaints_prod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "proreg"
      },
      complaints_serialno: String
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Complaint = mongoose.model("complaint", ComplaintSchema);

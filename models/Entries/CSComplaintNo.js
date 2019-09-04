const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//FORM NUMBER 3
const ComplaintNoSchema = new Schema({
  feedback: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "complaint"
  },
  //For Complaint Details tab
  //Remarks from Both Complaint and Assign

  //For Complaint Details tab
  //caseid, complaintdate, complainttime, client, departmentname, calltype, problemdetails, isresolvedon phone, productdetais

  //FOR caller details tab
  //name, designation, contactno, persontovisit, address

  assignmentdetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "assigncomplaint"
  },
  //Assignment Details tab
  //assignrefno, assigndatetime, assignengineer, assignremarks

  transno: { type: String },
  dateandtime: { type: Date },
  complaintnoremarks: { type: String },

  callstatus: {
    type: String,
    default: "Assigned"
    //Assigned, Unassigned, BringInRequest, BringIn, Sent, Received, Delivered, Closed
  },
  complaintdoc: { type: String }, //req.file.path
  complaintdocName: { type: String },
  date: { type: Date, default: Date.now() },

  complaintno_productdetails: [
    {
      complaintno_pro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "proreg"
      },
      complaintno_serialno: String
    }
  ]
});

module.exports = ComplaintNo = mongoose.model("complaintno", ComplaintNoSchema);
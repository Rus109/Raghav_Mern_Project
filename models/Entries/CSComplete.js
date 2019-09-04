const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//FORM NUMBER 3
const ComplaintClosedSchema = new Schema({
  transno: { type: String },
  dateandtime: { type: Date },
  complaintnoremarks: { type: String },

  callstatus: {
    type: String,
    default: "Assigned"
    //Assigned, Unassigned, BringInRequest, BringIn, Sent, Received, Delivered, Closed
  },
  deliverid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "delivertocustomer"
  },
  complaintdoc: { type: String }, //req.file.path
  complaintdocName: { type: String },

  date: { type: Date, default: Date.now() },

});

module.exports = ComplaintNo = mongoose.model("complaintclosed", ComplaintClosedSchema);
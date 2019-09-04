const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//FORM NUMBER 4
const BringInSchema = new Schema({
  transactionno: String,
  date: Date,
  // caseid: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "complaint"
  // },
  broughtby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employees"
  },
  complaintno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "complaintno"
  },
  bringinremark: String,
  // assigncomplaint: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "assigncomplaint"
  // },
  bringin_productdetails: [
    {
      bringin_pro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "proreg"
      },
      partno: String,
      bringin_serialno: String,
      bringin_remarks: String
    }
  ]
});

//ADDPRODUCTSTAB,  COMPLAINTSDETAILS, FEEDBACKS, RELATEDPRODUCTS, ASSIGNMENTDETAILSTAB, CALLERDETAILSTAB

module.exports = BringIn = mongoose.model("bringin", BringInSchema);
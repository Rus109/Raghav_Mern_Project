const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AMCRenewSchema = new Schema({
  amcrenewno: { type: String },
  amcrenewaldate: { type: Date },
  arncustomer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer"
  },
  arncustomertype: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customertype"
  },
  arndepartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customersubdepartment"
  },
  arnserviceprovider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "serviceprovider"
  },
  arnstartdate: { type: Date },
  arnexpiredate: { type: Date },
  arnremarks: { type: String },

  multpleamcandref: [
    {
      amcrefno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "amcregistration"
      },
      arnserialno: String,
      refno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "proreg"
      },
      proregserialno: String,
      dataamc: {
        type: String,
        default: "none"
      },
    }
  ],

  arnentrydate: {
    type: Date,
    dafault: Date.now
  }
});
module.exports = AMCRenew = mongoose.model("amcrenew", AMCRenewSchema);
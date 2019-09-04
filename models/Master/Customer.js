const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Customers Schema
const CustomerSchema = new Schema({
  customername: {
    type: String
  },
  customertype: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customertype"
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
module.exports = Customer = mongoose.model("customer", CustomerSchema);

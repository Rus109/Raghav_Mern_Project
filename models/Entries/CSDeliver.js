const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//FORM NUMBER 7
const DeliverToCustomerSchema = new Schema({
  delivertransactionnumber: String,
  deliverdate: Date,
  delivercaseid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "receivedfromservicing"
  },
  deliverremarks: String
});

module.exports = DeliverToCustomer = mongoose.model(
  "delivertocustomer",
  DeliverToCustomerSchema
);
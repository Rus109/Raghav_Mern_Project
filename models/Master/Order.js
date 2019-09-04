const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Orders Schema
const OrderSchema = new Schema({
  orderno: {
    type: String
  },
  product: {
    type:Schema.Types.ObjectId,
    ref: "product"
  },
  customername: {
    type: String
  },
  contactno: {
    type: Number
  },
  billingaddress: {
    type: String
  },
  quantity: {
    type: Number,
    default: 1
  },
  address: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Order = mongoose.model("order", OrderSchema);

//Customer Type Schema
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const CustomerTypeSchema = new schema({
  customertype: {
    type: String
  },
  description: {
    type: String
  }
});
module.exports = CustomerType = mongoose.model('customertype', CustomerTypeSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Service Provider Schema
const ServiceProviderSchema = new Schema({
  providername: {
    type: String
  },
  contactperson: {
    type: String
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
module.exports = ServiceProvider = mongoose.model(
  "serviceprovider",
  ServiceProviderSchema
);

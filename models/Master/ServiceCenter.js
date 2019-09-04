const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Service Center Schema
const ServiceCenterSchema = new Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company",
    default: "5c94b65a0c5c2404d8956fef"
  },
  serviceprovider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "serviceprovider",
    default: "5c7a18a6c9f64813cc7db302"
  },
  centername: {
    type: String
  },
  contactperson: {
    type: String
  },
  contactno: {
    type: String
  },
  alternatecontactno: {
    type: String
  },
  zipcode: {
    type: String
  },
  fax: {
    type: String
  },
  address: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = ServiceCenter = mongoose.model(
  "servicecenter",
  ServiceCenterSchema
);

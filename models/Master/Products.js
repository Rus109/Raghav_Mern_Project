const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Products Schema
const ProductSchema = new Schema({
  oem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company"
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productcategory"
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productsubcategory"
  },
  modelno: { type: String },
  description: { type: String },
  specification: { type: String },
  productdoc: {type: String},
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Product = mongoose.model("product", ProductSchema);

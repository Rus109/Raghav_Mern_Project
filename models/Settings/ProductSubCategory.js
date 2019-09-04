const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Product Sub Category Schema
const ProductSubCategorySchema = new Schema({
  subcategory: {
    type: String
  },
  parentcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productcategory"
  },
  description: {
    type: String
  }
});
module.exports = ProductSubCategory = mongoose.model(
  "productsubcategory",
  ProductSubCategorySchema
);

//Product Category Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductCategorySchema = new Schema({
  category: {
    type: String
  },
  description: {
    type: String
  }
});
module.exports = ProductCategory = mongoose.model(
  "productcategory",
  ProductCategorySchema
);

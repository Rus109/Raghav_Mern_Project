const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateProductInput(data) {
  let errors = {};
  data.modelno = !isEmpty(data.modelno) ? data.modelno : "";
  data.productdescription = !isEmpty(data.productdescription)
    ? data.productdescription
    : "";
  data.productspecification = !isEmpty(data.productspecification)
    ? data.productspecification
    : "";

  if (Validator.isEmpty(data.modelno)) {
    errors.modelno = "Model Number is required";
  }

  if (Validator.isEmpty(data.productdescription)) {
    errors.productdescription = " Product Description is required";
  }

  if (Validator.isEmpty(data.productspecification)) {
    errors.productspecification = "Product Specification is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateOrderInput(data) {
  let errors = {};

  data.orderno = !isEmpty(data.orderno) ? data.orderno : "";
  data.contactno = !isEmpty(data.contactno) ? data.contactno : "";
  data.billingaddress = !isEmpty(data.billingaddress)
    ? data.billingaddress
    : "";
  data.quantity = !isEmpty(data.quantity) ? data.quantity : "";
  data.address = !isEmpty(data.address) ? data.address : "";

  if (Validator.isEmpty(data.orderno)) {
    errors.orderno = "Order Number Field is required";
  }

  if (Validator.isEmpty(data.contactno)) {
    errors.contactno = "Contact Number is required";
  }

  if (Validator.isEmpty(data.billingaddress)) {
    errors.billingaddress = "Billing Address is required";
  }

  if (Validator.isEmpty(data.quantity)) {
    errors.quantity = "Quantity is required";
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = "Address is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateCustomerInput(data) {
  let errors = {};

  data.customername = !isEmpty(data.customername) ? data.customername : "";
  data.contactno = !isEmpty(data.contactno) ? data.contactno : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.fax = !isEmpty(data.fax) ? data.fax : "";
  data.address = !isEmpty(data.address) ? data.address : "";

  if (Validator.isEmpty(data.customername)) {
    errors.customername = "Customer Name is required";
  }

  if (Validator.isEmpty(data.contactno)) {
    errors.contactno = "Contact Number is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (Validator.isEmpty(data.fax)) {
    errors.fax = "Fax Number is required";
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = "Companys Address is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

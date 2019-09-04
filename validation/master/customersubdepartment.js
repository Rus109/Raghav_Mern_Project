const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateCustomerSubDepartmentInput(data) {
  let errors = {};

  data.department = !isEmpty(data.department) ? data.department : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (Validator.isEmpty(data.department)) {
    errors.department = "Department is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

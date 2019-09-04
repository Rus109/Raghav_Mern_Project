const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateServiceInput(data) {
  let errors = {};
  data.centername = !isEmpty(data.centername) ? data.centername : "";
  data.contactperson = !isEmpty(data.contactperson)
    ? data.contactperson
    : "";
  data.contactno = !isEmpty(data.contactno) ? data.contactno : "";
  data.zipcode = !isEmpty(data.zipcode) ? data.zipcode : '';
  data.fax = !isEmpty(data.fax) ? data.fax : '';
  data.address = !isEmpty(data.address) ? data.address : '';

  if (Validator.isEmpty(data.centername)) {
    errors.centername = "Center Name is required";
  }

  if (Validator.isEmpty(data.contactperson)) {
    errors.contactperson = "Contact Person is required";
  }

  if (Validator.isEmpty(data.contactno)) {
    errors.contactno = "Contact Number is required";
  }

  if (Validator.isEmpty(data.zipcode)) {
    errors.zipcode = "Zip Code of the Service Center is required";
  }

  if (Validator.isEmpty(data.fax)) {
    errors.fax = "Fax is required";
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = "Address is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

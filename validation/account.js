const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAccountInput(data) {
  let errors = {};

  data.type = !isEmpty(data.type) ? data.type : "";
  data.address = !isEmpty(data.address) ? data.address : "";

  if (Validator.isEmpty(data.type)) {
    errors.type = "Account Type is required";
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = "Account Address field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

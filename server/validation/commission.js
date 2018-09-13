const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCommissionInput(data) {
  let errors = {};

  data.type = !isEmpty(data.type) ? data.type : "";
  data.percentage = !isEmpty(data.percentage) ? data.percentage : "";

  if (Validator.isEmpty(data.type)) {
    errors.type = "Commission Type is required";
  }

  if (Validator.isEmpty(data.percentage)) {
    errors.percentage = "Commission percentage field is required";
  }

  if (!isEmpty(data.percentage)) {
    if (!Validator.isNumeric(data.percentage)) {
      errors.percentage = "Commission percentage should contain only numbers";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

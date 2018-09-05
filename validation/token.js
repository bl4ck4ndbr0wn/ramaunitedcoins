const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTokenInput(data) {
  let errors = {};

  data.modetransfer = !isEmpty(data.modetransfer) ? data.modetransfer : "";
  data.amount = !isEmpty(data.amount) ? data.amount : "";

  if (Validator.isEmpty(data.modetransfer)) {
    errors.modetransfer = "Mode of transfer field is required";
  }

  if (Validator.isEmpty(data.amount)) {
    errors.amount = "Amount field is required";
  }

  if (!isEmpty(data.amount)) {
    if (!Validator.isNumeric(data.amount)) {
      errors.amount = "Amount should contain only numbers";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

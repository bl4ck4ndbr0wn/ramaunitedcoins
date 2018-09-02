const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAdminTokenRequestInput(req) {
  let errors = {};
  data = req.body;

  data.user = !isEmpty(data.user) ? data.user : "";
  data.modetransfer = !isEmpty(data.modetransfer) ? data.modetransfer : "";
  data.amount = !isEmpty(data.amount) ? data.amount : "";

  if (Validator.isEmpty(data.modetransfer)) {
    errors.modetransfer = "Mode of transfer field is required";
  }

  if (Validator.isEmpty(data.user)) {
    errors.user = "Requesting User field is required";
  }

  if (Validator.isEmpty(data.amount)) {
    errors.amount = "Amount field is required";
  }

  if (!isEmpty(data.amount)) {
    if (!Validator.isNumeric(data.amount)) {
      errors.amount = "Amount should contain only numbers";
    }
  }

  if (isEmpty(data.fileupload)) {
    errors.fileupload = "File field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

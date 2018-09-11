const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAdminTokenRequestInput(req) {
  let errors = {};
  data = req.body;

  data.user = !isEmpty(data.user) ? data.user : "";
  data.modetransfer = !isEmpty(data.modetransfer) ? data.modetransfer : "";
  data.amount = !isEmpty(data.amount) ? data.amount : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.bonus = !isEmpty(data.bonus) ? data.bonus : "";

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

  if (Validator.isEmpty(data.price)) {
    errors.price = "Price field is required";
  }

  if (!isEmpty(data.price)) {
    if (!Validator.isNumeric(data.price)) {
      errors.price = "Price should contain only numbers";
    }
  }
  if (Validator.isEmpty(data.bonus)) {
    errors.bonus = "Bonus field is required";
  }

  if (!isEmpty(data.bonus)) {
    if (!Validator.isNumeric(data.bonus)) {
      errors.bonus = "Bonus should contain only numbers";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

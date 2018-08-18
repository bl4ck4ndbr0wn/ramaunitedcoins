const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRoundInput(data) {
  let errors = {};

  data.round = !isEmpty(data.round) ? data.round : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.bonus = !isEmpty(data.bonus) ? data.bonus : "";

  if (Validator.isEmpty(data.round)) {
    errors.round = "Inventer Round is required";
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = "Price field is required";
  }

  if (Validator.isEmpty(data.bonus)) {
    errors.bonus = "Bonus field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

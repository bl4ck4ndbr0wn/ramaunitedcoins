const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.telephone = !isEmpty(data.telephone) ? data.telephone : "";
  data.country = !isEmpty(data.country) ? data.country : "";
  data.amount = !isEmpty(data.amount) ? data.amount : "";
  data.referralcode = !isEmpty(data.referralcode) ? data.referralcode : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to between 2 and 4 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  if (Validator.isEmpty(data.telephone)) {
    errors.telephone = "Telephone field is required";
  }

  if (Validator.isEmpty(data.country)) {
    errors.country = "Country field is required";
  }

  if (!isEmpty(data.referralcode)) {
    if (!Validator.isURL(data.referralcode)) {
      errors.referralcode = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

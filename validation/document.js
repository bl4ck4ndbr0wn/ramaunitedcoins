const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateDocumentInput(req) {
  let errors = {};

  if (isEmpty(req.files)) {
    errors.fileupload = "File field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

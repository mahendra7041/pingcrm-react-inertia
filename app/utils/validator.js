import Validator from "validatorjs";
import ValidationException from "../exceptions/validation.exception.js";

Validator.register(
  "phone",
  function (value, requirement, attribute) {
    if (!value) return true;
    const phoneRegex =
      /^(\+?\d{1,3}[\s.-]?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;

    return phoneRegex.test(value);
  },
  "The :attribute is not valid format."
);

export function validate(data, rules, messages = {}) {
  const validator = new Validator(data, rules, messages);

  if (validator.fails()) {
    throw new ValidationException(
      "Validation Exception",
      validator.errors.errors
    );
  }

  return data;
}

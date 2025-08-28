import Validator from "validatorjs";
import ValidationException from "../exceptions/validation.exception.js";

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

import {
  minLengthValidationMW,
  requiredFieldValidationMW,
  validationResultMW,
} from "../../base/middlewares/validation/FieldsValidationMiddleware";

const loginBodyValidationsMW = [
  requiredFieldValidationMW("userName"),
  requiredFieldValidationMW("password"),
  minLengthValidationMW(6, "password"),
  validationResultMW,
];

export default loginBodyValidationsMW;

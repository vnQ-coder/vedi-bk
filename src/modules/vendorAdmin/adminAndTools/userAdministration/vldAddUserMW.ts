import {
  minLengthValidationMW,
  requiredFieldValidationMW,
  validationResultMW,
  requiredFieldValidationWithouTrimMW,
} from "../../../../base/middlewares/validation/FieldsValidationMiddleware";

const registerBodyValidationsMW = [
  requiredFieldValidationMW("name"),
  requiredFieldValidationMW("userName"),
  minLengthValidationMW(4, "userName"),
  requiredFieldValidationMW("email"),
  requiredFieldValidationWithouTrimMW("language"),
  requiredFieldValidationMW("password"),
  minLengthValidationMW(6, "password"),
  validationResultMW,
];

export default registerBodyValidationsMW;

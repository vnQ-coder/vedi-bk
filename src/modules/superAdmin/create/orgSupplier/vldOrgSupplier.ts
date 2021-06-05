import {
  requiredFieldValidationMW,
  validationResultMW,
} from "../../../../base/middlewares/validation/FieldsValidationMiddleware";

const supplierRegBodyValidationsMW = [
  requiredFieldValidationMW("name"),
  requiredFieldValidationMW("address1"),
  requiredFieldValidationMW("address2"),
  requiredFieldValidationMW("city"),
  requiredFieldValidationMW("country"),
  requiredFieldValidationMW("fax"),
  requiredFieldValidationMW("phone"),
  requiredFieldValidationMW("state"),
  requiredFieldValidationMW("zip"),
  requiredFieldValidationMW("language"),
  requiredFieldValidationMW("emailAddress"),
  validationResultMW,
];

export default supplierRegBodyValidationsMW;

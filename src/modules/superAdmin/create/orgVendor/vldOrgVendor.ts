import {
  requiredFieldValidationMW,
  validationResultMW,
} from "../../../../base/middlewares/validation/FieldsValidationMiddleware";

const vendorRegBodyValidationsMW = [
  requiredFieldValidationMW("name"),
  requiredFieldValidationMW("address1"),
  requiredFieldValidationMW("address2"),
  requiredFieldValidationMW("city"),
  requiredFieldValidationMW("country"),
  requiredFieldValidationMW("fax"),
  requiredFieldValidationMW("phone"),
  requiredFieldValidationMW("state"),
  requiredFieldValidationMW("www"),
  requiredFieldValidationMW("zip"),
  validationResultMW,
];

export default vendorRegBodyValidationsMW;

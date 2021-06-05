import {
  minLengthValidationMW,
  requiredFieldValidationMW,
  validationResultMW,
} from "../../../../base/middlewares/validation/FieldsValidationMiddleware";

const ChangePasswordBodyValidationsMW = [
  requiredFieldValidationMW("oldPassword"),
  minLengthValidationMW(6, "oldPassword"),
  requiredFieldValidationMW("newPassword"),
  minLengthValidationMW(6, "newPassword"),
  requiredFieldValidationMW("confirmPassword"),
  minLengthValidationMW(6, "confirmPassword"),
  validationResultMW,
];

export default ChangePasswordBodyValidationsMW;

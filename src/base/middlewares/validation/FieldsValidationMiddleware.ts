import { NextFunction, Request, Response } from "express";
import { check, ValidationChain, validationResult } from "express-validator";
import { UNPROCESSABLE_ENTITY } from "http-status-codes";
import CommonI18n from "../../../modules/shared/i18n/en";

export const requiredFieldValidationMW = (
  fieldName: string,
  fieldMsgAlias?: string,
): ValidationChain => check(fieldName)
  .trim()
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage(CommonI18n.Validation.required(fieldMsgAlias || fieldName));

export const requiredFieldValidationWithouTrimMW = (
  fieldName: string,
  fieldMsgAlias?: string,
): ValidationChain => check(fieldName)
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage(CommonI18n.Validation.required(fieldMsgAlias || fieldName));

export const nonEmptyFieldValidationMW = (
  fieldName: string,
  fieldMsgAlias?: string,
): ValidationChain => check(fieldName)
  .notEmpty()
  .withMessage(CommonI18n.Validation.required(fieldMsgAlias || fieldName));

export const minLengthValidationMW = (
  minCharacters: number,
  fieldName: string,
  fieldAlias?: string,
): ValidationChain => check(fieldName)
  .isLength({ min: minCharacters })
  .withMessage(
    CommonI18n.Validation.minLength(fieldAlias || fieldName, minCharacters),
  );

export const maxLengthValidationMW = (
  maxCharacters: number,
  fieldName: string,
  fieldAlias?: string,
): ValidationChain => check(fieldName)
  .isLength({ max: maxCharacters })
  .withMessage(
    CommonI18n.Validation.maxLength(fieldAlias || fieldName, maxCharacters),
  );

export const validationResultMW = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(UNPROCESSABLE_ENTITY).json({ message: errors.array()[0].msg });
  } else next();
};

export const emailFieldValidationMW = (
  fieldName: string,
  optional = true,
): ValidationChain => check(fieldName)
  .optional({ checkFalsy: optional })
  .isEmail()
  .withMessage(CommonI18n.Validation.invalidEmail());

export const numberFieldValidationMW = (
  fieldName: string,
  fieldAlias?: string,
): ValidationChain => check(fieldName)
  .isNumeric()
  .withMessage(CommonI18n.Validation.number(fieldAlias || fieldName));

export const phoneNumberValidationMW = (
  fieldName: string,
  fieldAlias?: string,
): ValidationChain => check(fieldName)
  .isLength({ min: 10, max: 20 })
  .matches(/^\+?[1-9]\d{1,14}$/g)
  .withMessage(CommonI18n.Validation.number(fieldAlias || fieldName));

export const nonNegativePositiveIntValidationMW = (
  fieldName: string,
  fieldAlias?: string,
): ValidationChain => check(fieldName)
  .isInt({ gt: 0, allow_leading_zeroes: false })
  .withMessage(CommonI18n.Validation.numberPositive(fieldAlias || fieldName));

export const limitRestrictionValidationMW = (
  fieldName: string,
  fieldAlias?: string,
): ValidationChain => check(fieldName)
  .isLength({ max: 2 })
  .withMessage(
    CommonI18n.Validation.limitRestriction(fieldAlias || fieldName),
  );

export const uuidValidationMW = (
  fieldName: string,
  fieldAlias?: string,
  optional = false,
): ValidationChain => check(fieldName)
  .optional(optional)
  .isUUID("4")
  .withMessage(CommonI18n.Validation.uuid(fieldAlias || fieldName));

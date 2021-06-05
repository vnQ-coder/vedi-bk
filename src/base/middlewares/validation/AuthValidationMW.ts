import { Request, Response, NextFunction } from "express";
import { UNAUTHORIZED } from "http-status-codes";
import CommonI18n from "../../../modules/shared/i18n/en";

export const isAuthMW = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (req.session && req.session.user) next();
  else res.status(UNAUTHORIZED).json({ message: CommonI18n.authenticationDenied() });
};

export const isSupplierMW = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (req.session.user && req.session.user.type === "supplier") next();
  else {
    res.status(UNAUTHORIZED).json({
      message: CommonI18n.roleAuthenticationDenied(),
    });
  }
};

export const isVendorMW = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (req.session.user && req.session.user.type === "vendor") next();
  else {
    res.status(UNAUTHORIZED).json({
      message: CommonI18n.roleAuthenticationDenied(),
    });
  }
};

export const oneOfRoleMW = (roles: string[]) => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (
    roles.length
    && req.session.user
    && roles.includes(req.session.user.type)
  ) {
    next();
  } else {
    res.status(UNAUTHORIZED).json({
      message: CommonI18n.roleAuthenticationDenied(),
    });
  }
};

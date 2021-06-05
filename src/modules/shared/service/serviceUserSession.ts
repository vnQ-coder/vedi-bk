import { Request } from "express";
import { SessionUserType } from "../types/sharedTypes";

export const saveSession = (
  req: Request,
  sessionData: SessionUserType
): void => {
  req.session.user = sessionData;
};

export const destroySession = (req: Request, cb?: (err: any) => void): void => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) console.log(err);
      if (cb) cb(err);
    });
  } else if (cb) cb(null);
};

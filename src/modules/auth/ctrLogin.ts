import { Transaction } from "knex";
import { NextFunction, Request, Response } from "express";
import { UNPROCESSABLE_ENTITY } from "http-status-codes";
import knex from "../../base/database/knex";
import CommonI18n from "../shared/i18n/en";
import login from "./serviceLogin";
import { destroySession, saveSession } from "../shared/service/serviceUserSession";

class LoginCtr {
  static async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await knex.transaction(
        async (trx: Transaction): Promise<void> => {
          const loginRes = await login(trx, req.body);
          if (loginRes.isAuthenticated) {
            saveSession(req, {
              entityId: loginRes.entityId,
              type: loginRes.entityType,
            });
            res.json({ userId: loginRes.entityId, message: CommonI18n.login() });
          } else {
            res
              .status(UNPROCESSABLE_ENTITY)
              .json({ message: CommonI18n.incorrect() });
          }
        },
      );
    } catch (e) {
      next(e);
    }
  }

  static async logout(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    destroySession(req, (err) => {
      if (!err) res.json({ message: CommonI18n.logout() });
      else next(err);
    });
  }

  static async getUserSessionDetails(
    req: Request,
    res: Response,
  ): Promise<void> {
    res.json(req.session.user);
  }
}

export default LoginCtr;

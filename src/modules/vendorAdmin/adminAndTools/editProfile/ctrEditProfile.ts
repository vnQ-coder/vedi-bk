import { Transaction } from "knex";
import { NextFunction, Request, Response } from "express";
import { UNPROCESSABLE_ENTITY } from "http-status-codes";
import knex from "../../../../base/database/knex";
import CommonI18n from "../../../shared/i18n/en";
import CredentialDao from "../../../shared/dao/daoCredential";
import CredentialModel from "../../../shared/models/modelCredential";
import EmailPreferenceDao from "./daoEmailPreference";

class EditProfileCtr {
  static async changePassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const data = req.body;
      const vuserId = req.session.user?.entityId;
      await knex.transaction(async (trx: Transaction) => {
        const getPreviousRecord = await new CredentialDao().findOneByCol(
          trx,
          "entityId",
          vuserId,
        );
        if (getPreviousRecord.password === data.oldPassword) {
          if (data.newPassword !== data.confirmPassword) {
            res
              .status(UNPROCESSABLE_ENTITY)
              .json({ message: CommonI18n.newAndConfirmPasswordNotMatch() });
          } else {
            await new CredentialDao().updateOneByColName(
              trx,
              { password: data.newPassword } as CredentialModel,
              "entityId",
              vuserId,
            );
            res.json({ message: CommonI18n.passwordChangeSuccess() });
          }
        } else {
          res
            .status(UNPROCESSABLE_ENTITY)
            .json({ message: CommonI18n.oldAndCurrentPasswordNotMatch() });
        }
      });
    } catch (e) {
      next(e);
    }
  }

  static async editProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await knex.transaction(async () => {
        res.json(req.body);
      });
    } catch (e) {
      next(e);
    }
  }

  static async getAllEmailPreferences(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await knex.transaction(
        async (trx: Transaction): Promise<void> => {
          const languages = await new EmailPreferenceDao().getAll(trx);
          res.json(languages);
        },
      );
    } catch (e) {
      next(e);
    }
  }
}

export default EditProfileCtr;

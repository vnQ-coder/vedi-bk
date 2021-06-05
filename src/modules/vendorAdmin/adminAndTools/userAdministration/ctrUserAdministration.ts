import { Transaction } from "knex";
import { NextFunction, Request, Response } from "express";
import { UNPROCESSABLE_ENTITY } from "http-status-codes";
import knex from "../../../../base/database/knex";
import CommonI18n from "../../../shared/i18n/en";
import CredentialDao from "../../../shared/dao/daoCredential";
import UserAdministrationService from "./serviceAddUserAdministration";
import OrgDao from "../../../shared/dao/daoOrg";

class UserAdministrationCtr {
  static async addUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await knex.transaction(
        async (trx: Transaction): Promise<void> => {
          const orgId = req.session.user.entityId;
          const userAlreadyExists = await new CredentialDao().findOneByCol(trx, "userName", req.body.userName);
          if (!userAlreadyExists) {
            const data = await UserAdministrationService.registerUser(trx, req.body, orgId, "vuser");
            res.json({ message: CommonI18n.userCreated(), data });
          } else {
            res.status(UNPROCESSABLE_ENTITY).json({ message: CommonI18n.userExists() });
          }
        },
      );
    } catch (e) {
      next(e);
    }
  }

  static async getAllVusers(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await knex.transaction(
        async (trx: Transaction): Promise<void> => {
          const vendorId = req.session.user.entityId;
          const result = await new OrgDao().getAllVendorUserByVendorId(trx, vendorId);
          res.json(result);
        },
      );
    } catch (e) {
      next(e);
    }
  }

  static async getVendorUserDetailsById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await knex.transaction(
        async (trx: Transaction): Promise<void> => {
          const vuserId = req.params.id;
          const result = await new OrgDao().getVendorUserDetailsById(trx, vuserId);
          res.json(result);
        },
      );
    } catch (e) {
      next(e);
    }
  }

  static async updateVendorUserDetailsById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await knex.transaction(
        async (trx: Transaction): Promise<void> => {
          await UserAdministrationService.updateUser(trx, req.body);
          res.json({ message: CommonI18n.userUpdated() });
        },
      );
    } catch (e) {
      next(e);
    }
  }
}

export default UserAdministrationCtr;

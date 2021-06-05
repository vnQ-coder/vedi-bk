import { Transaction } from "knex";
import { NextFunction, Request, Response } from "express";
import knex from "../../../../../base/database/knex";
import EmailPreferenceDao from "../../editProfile/daoEmailPreference";

class AdminAndToolsSharedCtr {
  static async getAllMailtypes(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await knex.transaction(
        async (trx: Transaction): Promise<void> => {
          const data = await new EmailPreferenceDao().findAllPickField(trx, "mailType");
          res.json(data);
        },
      );
    } catch (e) {
      next(e);
    }
  }
}

export default AdminAndToolsSharedCtr;

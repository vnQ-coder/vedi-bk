import { NextFunction, Request, Response } from "express";
import { Transaction } from "knex";
import knex from "../../../base/database/knex";
import OrgDao from "../dao/daoOrg";

class OrgCtr {
  static async getAllVendors(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await knex.transaction(async (trx: Transaction): Promise<void> => {
        res.json(await new OrgDao().getAllVendorNames(trx));
      });
    } catch (e) {
      next(e);
    }
  }
}

export default OrgCtr;

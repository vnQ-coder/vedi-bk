import { NextFunction, Request, Response } from "express";
import { Transaction } from "knex";
import knex from "../../../base/database/knex";
import LanguageDao from "../../vendorAdmin/adminAndTools/shared/dao/daoLanguage";

class LanguageCtr {
  static async getAllLanguages(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await knex.transaction(async (trx: Transaction): Promise<void> => {
        res.json(await new LanguageDao().findAllPickField(trx, "language"));
      });
    } catch (e) {
      next(e);
    }
  }
}

export default LanguageCtr;

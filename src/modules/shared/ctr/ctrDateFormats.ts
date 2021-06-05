import { NextFunction, Request, Response } from "express";
import { Transaction } from "knex";
import knex from "../../../base/database/knex";
import DateFormatDao from "../dao/daoDateFormat";

class DateFormatCtr {
  static async getAllDateFormats(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await knex.transaction(async (trx: Transaction): Promise<void> => {
        res.json(await new DateFormatDao().findAllPickField(trx, "dateFormat"));
      });
    } catch (e) {
      next(e);
    }
  }
}

export default DateFormatCtr;

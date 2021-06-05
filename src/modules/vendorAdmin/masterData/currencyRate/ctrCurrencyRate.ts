import { Transaction } from "knex";
import { NextFunction, Request, Response } from "express";
import knex from "../../../../../src/base/database/knex";
import CurrencyRateDao from "./daoCurrencyRate";

class CurrencyRateCtr {
  
  static async getCurrencyRate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await knex.transaction(async (trx: Transaction) => {
        const data = await new CurrencyRateDao().getCurrencyRate(trx, req.body);
        const totalRows = await new CurrencyRateDao().getTotalRows(trx);
        const total = totalRows.count;
        res.json({ data, total });
      });
    } catch (e) {
      next(e);
    }
  }

}

export default CurrencyRateCtr;

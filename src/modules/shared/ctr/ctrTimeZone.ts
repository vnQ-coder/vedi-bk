import { NextFunction, Request, Response } from "express";
import { Transaction } from "knex";
import knex from "../../../base/database/knex";
import TimeZoneDao from "../../vendorAdmin/adminAndTools/shared/dao/daoTimeZone";

class TimeZoneCtr {
  static async getAllTimeZones(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await knex.transaction(async (trx: Transaction): Promise<void> => {
        res.json(await new TimeZoneDao().findAllPickField(trx, "timeZone"));
      });
    } catch (e) {
      next(e);
    }
  }
}

export default TimeZoneCtr;

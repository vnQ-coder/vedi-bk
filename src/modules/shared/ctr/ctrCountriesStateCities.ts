import { NextFunction, Request, Response } from "express";
import { Transaction } from "knex";
import knex from "../../../base/database/knex";
import CityDao from "../dao/daoCity";
import CountryDao from "../dao/daoCountry";
import StateDao from "../dao/daoState";
import MessageModel from "../models/response/modelRespMessage";

class CountriesStateCitiesCtr {
  static async getAllCountries(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await knex.transaction(async (trx: Transaction): Promise<void> => {
        res.json(await new CountryDao().findAllPickField(trx, "country"));
      });
    } catch (e) {
      next(e);
    }
  }

  static async getAllStatesByCountry(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { countryCode } = req.query as { countryCode: string };
      await knex.transaction(async (trx: Transaction): Promise<void> => {
        if (countryCode) {
          const country = await new CountryDao().findOneByCol(trx, "country", countryCode);
          res.json(await new StateDao().getAllStateNamesByCountry(trx, country.isoCode));
        } else {
          res.json(new MessageModel("Country code is missing"));
        }
      });
    } catch (e) {
      next(e);
    }
  }

  static async getAllCitiesByCountryAndState(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { countryCode, stateCode } = req.query as { countryCode: string, stateCode: string };
      await knex.transaction(async (trx: Transaction): Promise<void> => {
        if (countryCode && stateCode) {
          const country = await new CountryDao().findOneByCol(trx, "country", countryCode);
          const state = await new StateDao().findOneByPredicate(trx, {
            countryCode: country.isoCode,
            state: stateCode,
          });
          res.json(await new CityDao().getAllCityNamesByCountryAndState(trx, state.countryCode, state.isoCode));
        } else {
          res.json(new MessageModel("Country or State code is missing"));
        }
      });
    } catch (e) {
      next(e);
    }
  }
}

export default CountriesStateCitiesCtr;

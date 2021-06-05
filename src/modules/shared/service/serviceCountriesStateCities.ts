import { Transaction } from "knex";
import CityDao from "../dao/daoCity";
import CountryDao from "../dao/daoCountry";
import StateDao from "../dao/daoState";
import CityModel from "../models/modelCity";
import CountryModel from "../models/modelCountry";
import StateModel from "../models/modelState";

class ServiceCountriesStateCities {
  static async getCountriesStateCitiesByNames(
    trx: Transaction,
    country: string,
    state: string,
    city: string,
  ):Promise<{
    country: CountryModel,
    state: StateModel,
    city: CityModel,
  }> {
    const countryModel = await new CountryDao().findOneByCol(trx, "country", country);
    const stateModel = await new StateDao().findOneByPredicate(trx, {
      countryCode: countryModel.isoCode,
      state,
    });
    const cityModel = await new CityDao().findOneByPredicate(trx, {
      countryCode: stateModel.countryCode,
      stateCode: stateModel.isoCode,
      city,
    });

    return {
      country: countryModel,
      state: stateModel,
      city: cityModel,
    };
  }
}

export default ServiceCountriesStateCities;

import { Transaction } from "knex";
import BaseDao from "../../../base/dao/BaseDao";
import CityModel from "../models/modelCity";

class CityDao extends BaseDao<CityModel> {
  constructor() {
    super(CityModel.TABLE_NAME);
  }

  getAllCityNamesByCountryAndState(
    trx: Transaction, countryCode: string, stateCode: string,
  ):Promise<string[]> {
    return this.findAllByPredicate(trx, {
      countryCode,
      stateCode,
    }).pluck(this.col("city"));
  }
}

export default CityDao;

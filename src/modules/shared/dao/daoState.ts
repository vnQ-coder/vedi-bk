import { Transaction } from "knex";
import BaseDao from "../../../base/dao/BaseDao";
import StateModel from "../models/modelState";

class StateDao extends BaseDao<StateModel> {
  constructor() {
    super(StateModel.TABLE_NAME);
  }

  getAllStateNamesByCountry(trx: Transaction, countryCode: string):Promise<string[]> {
    return this.findAllByCol(trx, "countryCode", countryCode).pluck(this.col("state"));
  }
}

export default StateDao;

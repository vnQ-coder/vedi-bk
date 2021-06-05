import BaseDao from "../../../base/dao/BaseDao";
import CountryModel from "../models/modelCountry";

class CountryDao extends BaseDao<CountryModel> {
  constructor() {
    super(CountryModel.TABLE_NAME);
  }
}

export default CountryDao;

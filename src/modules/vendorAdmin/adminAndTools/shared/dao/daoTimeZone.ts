import BaseDao from "../../../../../base/dao/BaseDao";
import TimeZoneModel from "../models/modelTimeZone";

class TimeZoneDao extends BaseDao<TimeZoneModel> {
  constructor() {
    super(TimeZoneModel.TABLE_NAME);
  }
}

export default TimeZoneDao;

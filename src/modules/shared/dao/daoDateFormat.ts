import BaseDao from "../../../base/dao/BaseDao";
import DateFormatModel from "../models/modelDateFormat";

class DateFormatDao extends BaseDao<DateFormatModel> {
  constructor() {
    super(DateFormatModel.TABLE_NAME);
  }
}

export default DateFormatDao;

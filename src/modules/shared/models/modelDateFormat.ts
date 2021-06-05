import BaseModel from "../../../base/model/BaseModel";
import { DateFormatType } from "../types/sharedTypes";

class DateFormatModel extends BaseModel {
  static TABLE_NAME = "date_format";

  constructor(
    public dateFormat: DateFormatType,
    id?: string,
  ) {
    super(id);
  }

  static col(k: keyof DateFormatModel, prefix = true): string {
    return prefix ? `${DateFormatModel.TABLE_NAME}.${k}` : k;
  }

  static dateFormat(k: DateFormatModel["dateFormat"]): DateFormatType {
    return k as DateFormatType;
  }
}

export default DateFormatModel;

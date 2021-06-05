import BaseModel from "../../../../../base/model/BaseModel";
import { TimeZonesListType } from "../../../../shared/types/sharedTypes";

class TimeZoneModel extends BaseModel {
  static TABLE_NAME = "time_zone";

  constructor(
    public timeZone: TimeZonesListType,
    id?: string,
  ) {
    super(id);
  }

  static col(k: keyof TimeZoneModel, prefix = true): string {
    return prefix ? `${TimeZoneModel.TABLE_NAME}.${k}` : k;
  }

  static timeZoneType(k: TimeZoneModel["timeZone"]): TimeZoneModel["timeZone"] {
    return k;
  }
}

export default TimeZoneModel;

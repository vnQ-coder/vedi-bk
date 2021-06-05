import BaseModel from "../../../../../base/model/BaseModel";

class AccessLogModel extends BaseModel {
  static TABLE_NAME = "access_logs";

  constructor(
    public entityId: string,
    public lastAccessDate: string,
    public incorrectTrialCount: number,
    public lastPasswordChangeDate: string,
    id?: string
  ) {
    super(id);
  }

  static col(k: keyof AccessLogModel, prefix = true): string {
    return prefix ? `${AccessLogModel.TABLE_NAME}.${k}` : k;
  }
}

export default AccessLogModel;

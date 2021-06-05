import BaseModel from "../../../../base/model/BaseModel";

class EmailPreferenceModel extends BaseModel {
  static TABLE_NAME = "email_preferences";

  constructor(
    public mailType: string,
    id?: string,
  ) {
    super(id);
  }

  static col(k: keyof EmailPreferenceModel, prefix = true): string {
    return prefix ? `${EmailPreferenceModel.TABLE_NAME}.${k}` : k;
  }
}

export default EmailPreferenceModel;

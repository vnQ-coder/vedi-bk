import BaseModel from "../../../../../base/model/BaseModel";

class UserEmailPreferencesModel extends BaseModel {
  static TABLE_NAME = "user__email_preferences";

  constructor(
    public entityId: string,
    public mailTypeId: string,
    id?: string,
  ) {
    super(id);
  }

  static col(k: keyof UserEmailPreferencesModel, prefix = true): string {
    return prefix ? `${UserEmailPreferencesModel.TABLE_NAME}.${k}` : k;
  }
}

export default UserEmailPreferencesModel;

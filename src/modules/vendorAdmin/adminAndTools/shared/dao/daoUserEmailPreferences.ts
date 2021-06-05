import BaseDao from "../../../../../base/dao/BaseDao";
import UserEmailPreferencesModel from "../models/modelUserEmailPreferences";

class UserEmailPreferencesDao extends BaseDao<UserEmailPreferencesModel> {
  constructor() {
    super(UserEmailPreferencesModel.TABLE_NAME);
  }
}

export default UserEmailPreferencesDao;

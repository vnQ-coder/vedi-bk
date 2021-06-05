import BaseDao from "../../../../../base/dao/BaseDao";
import UserPreferenceModel from "../models/modelUserPreference";

class UserPreferenceDao extends BaseDao<UserPreferenceModel> {
  constructor() {
    super(UserPreferenceModel.TABLE_NAME);
  }
}

export default UserPreferenceDao;

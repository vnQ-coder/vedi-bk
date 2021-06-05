import BaseDao from "../../../../../base/dao/BaseDao";
import UserPersonalDetailsModel from "../models/modelUserPersonalDetails";

class UserPersonalDetailsDao extends BaseDao<UserPersonalDetailsModel> {
  constructor() {
    super(UserPersonalDetailsModel.TABLE_NAME);
  }
}

export default UserPersonalDetailsDao;

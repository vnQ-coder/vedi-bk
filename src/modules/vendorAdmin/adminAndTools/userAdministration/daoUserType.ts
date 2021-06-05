import BaseDao from "../../../../base/dao/BaseDao";
import UserTypeModel from "./modelUserType";

class UserTypeDao extends BaseDao<UserTypeModel> {
  constructor() {
    super(UserTypeModel.TABLE_NAME);
  }
}

export default UserTypeDao;

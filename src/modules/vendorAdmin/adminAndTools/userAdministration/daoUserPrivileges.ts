import BaseDao from "../../../../base/dao/BaseDao";
import UserPrivilegesModel from "./modelUserPrivileges";

class UserPrivilegesDao extends BaseDao<UserPrivilegesModel> {
  constructor() {
    super(UserPrivilegesModel.TABLE_NAME);
  }
}

export default UserPrivilegesDao;

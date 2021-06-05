import BaseModel from "../../../../base/model/BaseModel";
import { PrivilegesType } from "../shared/types/adminAndToolsTypes";

class UserPrivilegesModel extends BaseModel {
  static TABLE_NAME = "user_privileges";

  constructor(
    public entityId: string,
    public privilege: PrivilegesType,
    id?: string,
  ) {
    super(id);
  }

  static col(k: keyof UserPrivilegesModel, prefix = true): string {
    return prefix ? `${UserPrivilegesModel.TABLE_NAME}.${k}` : k;
  }

  static privilege(k: UserPrivilegesModel["privilege"]): PrivilegesType {
    return k as PrivilegesType;
  }
}

export default UserPrivilegesModel;

import BaseModel from "../../../../base/model/BaseModel";
import { UserTypes } from "../shared/types/adminAndToolsTypes";

class UserTypeModel extends BaseModel {
  static TABLE_NAME = "user_types";

  constructor(
    public entityId: string,
    public type: UserTypes,
    id?: string,
  ) {
    super(id);
  }

  static col(k: keyof UserTypeModel, prefix = true): string {
    return prefix ? `${UserTypeModel.TABLE_NAME}.${k}` : k;
  }

  static type(k: UserTypeModel["type"]): UserTypes {
    return k as UserTypes;
  }
}

export default UserTypeModel;

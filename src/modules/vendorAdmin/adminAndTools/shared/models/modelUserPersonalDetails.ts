import BaseModel from "../../../../../base/model/BaseModel";

class UserPersonalDetailsModel extends BaseModel {
  static TABLE_NAME = "user__personal_details";

  constructor(
    public entityId: string,
    public gender: string,
    public firstName: string,
    public lastName: string,
    public title: string,
    id?: string,
  ) {
    super(id);
  }

  static col(k: keyof UserPersonalDetailsModel, prefix = true): string {
    return prefix ? `${UserPersonalDetailsModel.TABLE_NAME}.${k}` : k;
  }
}

export default UserPersonalDetailsModel;

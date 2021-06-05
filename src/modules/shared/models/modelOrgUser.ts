import BaseModel from "../../../base/model/BaseModel";

class OrgUserModel extends BaseModel {
  static TABLE_NAME = "org_user";

  constructor(
    public orgId: string,
    public userId: string,
    id?: string,
  ) {
    super(id);
  }

  static col(k: keyof OrgUserModel, prefix = true): string {
    return prefix ? `${OrgUserModel.TABLE_NAME}.${k}` : k;
  }
}

export default OrgUserModel;

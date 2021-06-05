import BaseModel from "../../../base/model/BaseModel";

class OrgOrgModel extends BaseModel {
  static TABLE_NAME = "org_org";

  constructor(
     public vendorId: string,
     public supplierId: string,
     id?: string,
  ) {
    super(id);
  }

  static col(k: keyof OrgOrgModel, prefix = true): string {
    return prefix ? `${OrgOrgModel.TABLE_NAME}.${k}` : k;
  }
}

export default OrgOrgModel;

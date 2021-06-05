import BaseModel from "../../../base/model/BaseModel";

class OrgDetailsModel extends BaseModel {
  static TABLE_NAME = "org_details";

  constructor(
     public name: string,
     public entityId : string,
     id?: string,
  ) {
    super(id);
  }

  static col(k: keyof OrgDetailsModel, prefix = true): string {
    return prefix ? `${OrgDetailsModel.TABLE_NAME}.${k}` : k;
  }
}

export default OrgDetailsModel;

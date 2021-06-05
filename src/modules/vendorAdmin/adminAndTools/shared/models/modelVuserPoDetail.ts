import BaseModel from "../../../../../base/model/BaseModel";

class VuserPoDetailModel extends BaseModel {
  static TABLE_NAME = "vuser__po_details";

  constructor(
    public entityId: string,
    public poPrefix: string,
    public poPrefix2: string,
    public poEmail: string,
    public poEmail2: string,
    id?: string,
  ) {
    super(id);
  }

  static col(k: keyof VuserPoDetailModel, prefix = true): string {
    return prefix ? `${VuserPoDetailModel.TABLE_NAME}.${k}` : k;
  }
}

export default VuserPoDetailModel;

import BaseModel from "../../../base/model/BaseModel";

class StateModel extends BaseModel {
  static TABLE_NAME = "state";

  constructor(
     public state: string,
     public isoCode: string,
     public countryCode: string,
     id?: string,
  ) {
    super(id);
  }

  static col(k: keyof StateModel, prefix = true): string {
    return prefix ? `${StateModel.TABLE_NAME}.${k}` : k;
  }
}

export default StateModel;

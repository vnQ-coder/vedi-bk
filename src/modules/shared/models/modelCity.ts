import BaseModel from "../../../base/model/BaseModel";

class CityModel extends BaseModel {
  static TABLE_NAME = "city";

  constructor(
     public city: string,
     public stateCode: string,
     public countryCode: string,
     id?: string,
  ) {
    super(id);
  }

  static col(k: keyof CityModel, prefix = true): string {
    return prefix ? `${CityModel.TABLE_NAME}.${k}` : k;
  }
}

export default CityModel;

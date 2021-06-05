import BaseModel from "../../../base/model/BaseModel";

class CountryModel extends BaseModel {
  static TABLE_NAME = "country";

  constructor(
     public country: string,
     public isoCode: string,
     public phonecode: string,
     id?: string,
  ) {
    super(id);
  }

  static col(k: keyof CountryModel, prefix = true): string {
    return prefix ? `${CountryModel.TABLE_NAME}.${k}` : k;
  }
}

export default CountryModel;

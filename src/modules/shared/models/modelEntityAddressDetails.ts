import BaseModel from "../../../base/model/BaseModel";

class EntityAddressDetailsModel extends BaseModel {
  static TABLE_NAME = "entity__address_details";

  constructor(
     public address1: string,
     public address2: string,
     public zip: string,
     public cityId: string,
     public countryId: string,
     public stateId: string,
     public entityId?: string,
     id?: string,
  ) {
    super(id);
  }

  static col(k: keyof EntityAddressDetailsModel, prefix = true): string {
    return prefix ? `${EntityAddressDetailsModel.TABLE_NAME}.${k}` : k;
  }
}

export default EntityAddressDetailsModel;

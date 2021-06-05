import BaseModel from "../../../../../base/model/BaseModel";
import { ContactInfoType, ContactType } from "../types/adminAndToolsTypes";

class EntityContactDetailsModel extends BaseModel {
  static TABLE_NAME = "entity__contact_details";

  constructor(
    public entityId: string,
    public contactType: ContactType,
    public value: string,
    public type: ContactInfoType,
    id?: string,
  ) {
    super(id);
  }

  static col(k: keyof EntityContactDetailsModel, prefix = true): string {
    return prefix ? `${EntityContactDetailsModel.TABLE_NAME}.${k}` : k;
  }

  static contactType(k: EntityContactDetailsModel["contactType"]): ContactType {
    return k as ContactType;
  }

  static type(k: EntityContactDetailsModel["type"]): ContactInfoType {
    return k as ContactInfoType;
  }
}

export default EntityContactDetailsModel;

import BaseModel from "../../../base/model/BaseModel";
import { EntityUrlType } from "../types/sharedTypes";

class EntityUrlModel extends BaseModel {
  static TABLE_NAME = "entity__url";

  constructor(
     public url: string,
     public type: EntityUrlType,
     public entityId?: string,
     id?: string,
  ) {
    super(id);
  }

  static col(k: keyof EntityUrlModel, prefix = true): string {
    return prefix ? `${EntityUrlModel.TABLE_NAME}.${k}` : k;
  }

  static type(k: EntityUrlModel["type"]): EntityUrlType {
    return k as EntityUrlType;
  }
}

export default EntityUrlModel;

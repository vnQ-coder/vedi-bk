import BaseModel from "../../../base/model/BaseModel";
import { EntityType, StatusType } from "../types/sharedTypes";

class EntityModel extends BaseModel {
  static TABLE_NAME = "entity";

  constructor(
    public type: EntityType,
    public status: StatusType,
    id?: string,
  ) {
    super(id);
  }

  static col(k: keyof EntityModel, prefix = true): string {
    return prefix ? `${EntityModel.TABLE_NAME}.${k}` : k;
  }

  static type(k: EntityModel["type"]): EntityType {
    return k as EntityType;
  }

  static status(k: EntityModel["status"]): StatusType {
    return k as StatusType;
  }
}

export default EntityModel;

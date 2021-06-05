import BaseDao from "../../../base/dao/BaseDao";
import EntityUrlModel from "../models/modelEntityUrl";

class EntityUrlDao extends BaseDao<EntityUrlModel> {
  constructor() {
    super(EntityUrlModel.TABLE_NAME);
  }
}

export default EntityUrlDao;

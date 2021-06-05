import BaseDao from "../../../base/dao/BaseDao";
import EntityModel from "../models/modelEntity";

class EntityDao extends BaseDao<EntityModel> {
  constructor() {
    super(EntityModel.TABLE_NAME);
  }
}

export default EntityDao;

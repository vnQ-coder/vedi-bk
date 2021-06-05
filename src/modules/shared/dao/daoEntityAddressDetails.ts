import BaseDao from "../../../base/dao/BaseDao";
import EntityAddressDetailsModel from "../models/modelEntityAddressDetails";

class EntityAddressDetailsDao extends BaseDao<EntityAddressDetailsModel> {
  constructor() {
    super(EntityAddressDetailsModel.TABLE_NAME);
  }
}

export default EntityAddressDetailsDao;

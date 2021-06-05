import { Raw, Transaction } from "knex";
import BaseDao from "../../../base/dao/BaseDao";
import EntityContactDetailsModel from "../../vendorAdmin/adminAndTools/shared/models/modelEntityContactDetails";
import OrgUserModel from "../models/modelOrgUser";

class EntityContactDetailsDao extends BaseDao<EntityContactDetailsModel> {
  constructor() {
    super(EntityContactDetailsModel.TABLE_NAME);
  }

  queryGetEntityContactDetailByEntity(trx: Transaction):Raw {
    return trx.raw(trx(EntityContactDetailsModel.TABLE_NAME)
      .select(this.col("id"))
      .where(this.col("entityId"), trx.raw("??", [OrgUserModel.col("userId")]))
      .limit(1)
      .toString()).wrap("(", ")");
  }
}

export default EntityContactDetailsDao;

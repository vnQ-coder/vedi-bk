import { QueryBuilder, Transaction } from "knex";
import BaseDao from "../../../../../base/dao/BaseDao";
import EntityContactDetailsModel from "../models/modelEntityContactDetails";

class EntityContactDetailsDao extends BaseDao<EntityContactDetailsModel> {
  constructor() {
    super(EntityContactDetailsModel.TABLE_NAME);
  }

  getEntityContactDetailIdByEntityIdAndType(
    trx: Transaction,
    type: string,
    contactType: string,
    entityId: string,
  ): QueryBuilder<EntityContactDetailsModel> {
    return trx(this.tableName)
      .where(this.col("type"), type)
      .andWhere(this.col("contactType"), contactType)
      .andWhere(this.col("entityId"), entityId)
      .first();
  }
}

export default EntityContactDetailsDao;

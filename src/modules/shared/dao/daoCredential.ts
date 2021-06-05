import { Transaction } from "knex";
import BaseDao from "../../../base/dao/BaseDao";
import CredentialModel from "../models/modelCredential";
import EntityModel from "../models/modelEntity";

class CredentialDao extends BaseDao<CredentialModel> {
  constructor() {
    super(CredentialModel.TABLE_NAME);
  }

  getCredentialByUserName(
    trx: Transaction,
    userName: string,
  ): Promise<CredentialModel> {
    return trx(this.tableName)
      .leftJoin(
        EntityModel.TABLE_NAME,
        EntityModel.col("id"),
        this.col("entityId"),
      )
      .where(this.col("userName"), userName)
      .andWhere(EntityModel.col("status"), EntityModel.status("active"))
      .first();
  }
}

export default CredentialDao;

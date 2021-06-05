import * as Knex from "knex";
import { QueryBuilder } from "knex";
import UserTypeModel from "../../../../modules/vendorAdmin/adminAndTools/userAdministration/modelUserType";
import EntityModel from "../../../../modules/shared/models/modelEntity";
import { UserAccountsType } from "../../../../modules/vendorAdmin/adminAndTools/shared/types/adminAndToolsTypes";
import { DropTablePostgresql } from "../../../../modules/shared/utils/queriesUtil";

const { TABLE_NAME, col } = UserTypeModel;

export async function up(knex: Knex): Promise<QueryBuilder> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()")).notNullable();
      table.uuid(col("entityId", false)).references(EntityModel.col("id", false)).inTable(EntityModel.TABLE_NAME);
      table.enu(col("type", false), UserAccountsType);
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(DropTablePostgresql(TABLE_NAME));
}

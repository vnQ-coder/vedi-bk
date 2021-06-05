import * as Knex from "knex";
import { QueryBuilder } from "knex";
import EntityModel from "../../../../modules/shared/models/modelEntity";
import OrgUserModel from "../../../../modules/shared/models/modelOrgUser";
import { DropTablePostgresql } from "../../../../modules/shared/utils/queriesUtil";

const { TABLE_NAME, col } = OrgUserModel;

export async function up(knex: Knex): Promise<QueryBuilder> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table.uuid(col("id", false)).primary().defaultTo(knex.raw("uuid_generate_v4()")).notNullable();
      table.uuid(col("orgId", false)).references(EntityModel.col("id", false)).inTable(EntityModel.TABLE_NAME);
      table.uuid(col("userId", false)).references(EntityModel.col("id", false)).inTable(EntityModel.TABLE_NAME);
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(DropTablePostgresql(TABLE_NAME));
}

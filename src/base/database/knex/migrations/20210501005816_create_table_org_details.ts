import * as Knex from "knex";
import { QueryBuilder } from "knex";
import OrgDetailsModel from "../../../../modules/shared/models/modelOrgDetails";
import EntityModel from "../../../../modules/shared/models/modelEntity";
import { DropTablePostgresql } from "../../../../modules/shared/utils/queriesUtil";

const { TABLE_NAME, col } = OrgDetailsModel;

export async function up(knex: Knex): Promise<QueryBuilder> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table.uuid(col("id", false)).primary().defaultTo(knex.raw("uuid_generate_v4()")).notNullable();
      table.uuid(col("entityId", false)).references(EntityModel.col("id", false)).inTable(EntityModel.TABLE_NAME);
      table.string(col("name", false)).notNullable().unique();
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(DropTablePostgresql(TABLE_NAME));
}

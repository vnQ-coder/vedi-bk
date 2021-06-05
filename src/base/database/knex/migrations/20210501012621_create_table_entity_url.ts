import * as Knex from "knex";
import { QueryBuilder } from "knex";
import EntityModel from "../../../../modules/shared/models/modelEntity";
import EntityUrlModel from "../../../../modules/shared/models/modelEntityUrl";
import { EntityUrlTypeList } from "../../../../modules/shared/types/sharedTypes";
import { DropTablePostgresql } from "../../../../modules/shared/utils/queriesUtil";

const { TABLE_NAME, col } = EntityUrlModel;

export async function up(knex: Knex): Promise<QueryBuilder> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table.uuid(col("id", false)).primary().defaultTo(knex.raw("uuid_generate_v4()")).notNullable();
      table.uuid(col("entityId", false)).references(EntityModel.col("id", false)).inTable(EntityModel.TABLE_NAME);
      table.string(col("url", false)).notNullable();
      table.enu(col("type", false), EntityUrlTypeList).defaultTo(EntityUrlModel.type("normal"));
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(DropTablePostgresql(TABLE_NAME));
}

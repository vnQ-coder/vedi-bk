import * as Knex from "knex";
import { QueryBuilder } from "knex";
import StateModel from "../../../../modules/shared/models/modelState";
import { DropTablePostgresql } from "../../../../modules/shared/utils/queriesUtil";

const { TABLE_NAME, col } = StateModel;

export async function up(knex: Knex): Promise<QueryBuilder> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table.uuid(col("id", false)).primary().defaultTo(knex.raw("uuid_generate_v4()")).notNullable();
      table.string(col("state", false)).notNullable();
      table.string(col("isoCode", false)).notNullable();
      table.string(col("countryCode", false)).notNullable();
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(DropTablePostgresql(TABLE_NAME));
}

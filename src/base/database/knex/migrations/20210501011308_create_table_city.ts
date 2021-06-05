import * as Knex from "knex";
import { QueryBuilder } from "knex";
import CityModel from "../../../../modules/shared/models/modelCity";
import { DropTablePostgresql } from "../../../../modules/shared/utils/queriesUtil";

const { TABLE_NAME, col } = CityModel;

export async function up(knex: Knex): Promise<QueryBuilder> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table.uuid(col("id", false)).primary().defaultTo(knex.raw("uuid_generate_v4()")).notNullable();
      table.string(col("city", false)).notNullable();
      table.string(col("stateCode", false)).notNullable();
      table.string(col("countryCode", false)).notNullable();
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(DropTablePostgresql(TABLE_NAME));
}

import * as Knex from "knex";
import { QueryBuilder } from "knex";
import CountryModel from "../../../../modules/shared/models/modelCountry";
import { DropTablePostgresql } from "../../../../modules/shared/utils/queriesUtil";

const { TABLE_NAME, col } = CountryModel;

export async function up(knex: Knex): Promise<QueryBuilder> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table.uuid(col("id", false)).primary().defaultTo(knex.raw("uuid_generate_v4()")).notNullable();
      table.string(col("country", false)).notNullable().unique();
      table.string(col("isoCode", false)).notNullable().unique();
      table.string(col("phonecode", false)).notNullable();
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(DropTablePostgresql(TABLE_NAME));
}

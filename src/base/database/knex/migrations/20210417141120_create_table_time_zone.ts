import * as Knex from "knex";
import { QueryBuilder } from "knex";
import { TimeZonesList } from "../../../../modules/shared/types/sharedTypes";
import TimeZoneModel from "../../../../modules/vendorAdmin/adminAndTools/shared/models/modelTimeZone";
import { DropTablePostgresql } from "../../../../modules/shared/utils/queriesUtil";

const { TABLE_NAME, col } = TimeZoneModel;

export async function up(knex: Knex): Promise<QueryBuilder> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()")).notNullable();
      table.enu(col("timeZone", false), TimeZonesList)
        .defaultTo(TimeZoneModel.timeZoneType("Etc/GMT+11"));
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(DropTablePostgresql(TABLE_NAME));
}

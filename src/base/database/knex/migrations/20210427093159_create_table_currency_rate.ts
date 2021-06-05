import * as Knex from "knex";
import { QueryBuilder } from "knex";
import CurrencyRateModel from "../../../../modules/vendorAdmin/masterData/currencyRate/modelCurrencyRate";
import { DropTablePostgresql } from "../../../../modules/shared/utils/queriesUtil";

const { TABLE_NAME, col } = CurrencyRateModel;

export async function up(knex: Knex): Promise<QueryBuilder> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()")).notNullable();
      table.string(col("name", false));
      table.decimal(col("buyingRate", false));
      table.string(col("date", false));
      table.decimal(col("sellingRate", false));
      table.integer(col("unit", false));
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(DropTablePostgresql(TABLE_NAME));
}

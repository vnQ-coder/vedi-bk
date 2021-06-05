import * as Knex from "knex";
import { QueryBuilder } from "knex";
import DateFormatModel from "../../../../modules/shared/models/modelDateFormat";
import TimeZoneModel from "../../../../modules/vendorAdmin/adminAndTools/shared/models/modelTimeZone";
import UserPreferenceModel from "../../../../modules/vendorAdmin/adminAndTools/shared/models/modelUserPreference";
import LanguageModel from "../../../../modules/vendorAdmin/adminAndTools/shared/models/modelLanguage";
import EntityModel from "../../../../modules/shared/models/modelEntity";
import {
  ShowPurchaseSummaryType,
} from "../../../../modules/vendorAdmin/adminAndTools/shared/types/adminAndToolsTypes";
import { DropTablePostgresql } from "../../../../modules/shared/utils/queriesUtil";

const { TABLE_NAME, col } = UserPreferenceModel;

export async function up(knex: Knex): Promise<QueryBuilder> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table
        .uuid("id")
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"))
        .notNullable();
      table
        .uuid(col("entityId", false))
        .references(EntityModel.col("id", false))
        .inTable(EntityModel.TABLE_NAME);
      table
        .uuid(col("languageId", false))
        .references(LanguageModel.col("id", false))
        .inTable(LanguageModel.TABLE_NAME);
      table.enu(
        col("showPurchaseOrderSummary", false),
        ShowPurchaseSummaryType,
      );
      table.integer(col("linePerPage", false));
      table
        .uuid(col("timeZoneId", false))
        .references(TimeZoneModel.col("id", false))
        .inTable(TimeZoneModel.TABLE_NAME);
      table
        .uuid(col("dateFormatId", false))
        .references(DateFormatModel.col("id", false))
        .inTable(DateFormatModel.TABLE_NAME);
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(DropTablePostgresql(TABLE_NAME));
}

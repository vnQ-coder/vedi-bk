import * as Knex from "knex";
import { QueryBuilder } from "knex";
import UserEmailPreferencesModel
  from "../../../../modules/vendorAdmin/adminAndTools/shared/models/modelUserEmailPreferences";
import EntityModel from "../../../../modules/shared/models/modelEntity";
import EmailPreferenceModel from "../../../../modules/vendorAdmin/adminAndTools/editProfile/modelEmailPreference";
import { DropTablePostgresql } from "../../../../modules/shared/utils/queriesUtil";

const { TABLE_NAME, col } = UserEmailPreferencesModel;

export async function up(knex: Knex): Promise<QueryBuilder> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table
        .uuid(col("id", false))
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"))
        .notNullable();
      table
        .uuid(col("entityId", false))
        .references(EntityModel.col("id", false))
        .inTable(EntityModel.TABLE_NAME);
      table
        .uuid(col("mailTypeId", false))
        .references(EmailPreferenceModel.col("id", false))
        .inTable(EmailPreferenceModel.TABLE_NAME);
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(DropTablePostgresql(TABLE_NAME));
}

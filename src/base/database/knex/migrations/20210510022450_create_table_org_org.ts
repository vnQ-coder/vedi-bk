import * as Knex from "knex";
import EntityModel from "../../../../modules/shared/models/modelEntity";
import OrgOrgModel from "../../../../modules/shared/models/modelOrgOrg";
import { DropTablePostgresql } from "../../../../modules/shared/utils/queriesUtil";

const { TABLE_NAME, col } = OrgOrgModel;

export async function up(knex: Knex): Promise<any> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table
        .uuid(col("id", false))
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"))
        .notNullable();
      table
        .uuid(col("vendorId", false))
        .references(EntityModel.col("id", false))
        .inTable(EntityModel.TABLE_NAME);
      table
        .uuid(col("supplierId", false))
        .references(EntityModel.col("id", false))
        .inTable(EntityModel.TABLE_NAME);
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.raw(DropTablePostgresql(TABLE_NAME));
}

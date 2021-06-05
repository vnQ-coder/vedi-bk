import * as Knex from "knex";
import DateFormatModel from "../../../../modules/shared/models/modelDateFormat";
import { DateFormatTypeList } from "../../../../modules/shared/types/sharedTypes";
import { DropTablePostgresql } from "../../../../modules/shared/utils/queriesUtil";

const { TABLE_NAME, col } = DateFormatModel;

export async function up(knex: Knex): Promise<any> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table
        .uuid(col("id", false))
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"))
        .notNullable();
      table.enu(col("dateFormat", false), DateFormatTypeList)
        .defaultTo(DateFormatModel.dateFormat("MM DD YYYY"));
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.raw(DropTablePostgresql(TABLE_NAME));
}

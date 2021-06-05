import * as Knex from "knex";
import { QueryBuilder } from "knex";
import CityModel from "../../../../modules/shared/models/modelCity";
import CountryModel from "../../../../modules/shared/models/modelCountry";
import EntityModel from "../../../../modules/shared/models/modelEntity";
import EntityAddressDetailsModel from "../../../../modules/shared/models/modelEntityAddressDetails";
import StateModel from "../../../../modules/shared/models/modelState";
import { DropTablePostgresql } from "../../../../modules/shared/utils/queriesUtil";

const { TABLE_NAME, col } = EntityAddressDetailsModel;

export async function up(knex: Knex): Promise<QueryBuilder> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table.uuid(col("id", false)).primary().defaultTo(knex.raw("uuid_generate_v4()")).notNullable();
      table.uuid(col("entityId", false)).references(EntityModel.col("id", false)).inTable(EntityModel.TABLE_NAME);
      table.uuid(col("countryId", false)).references(CountryModel.col("id", false)).inTable(CountryModel.TABLE_NAME);
      table.uuid(col("cityId", false)).references(CityModel.col("id", false)).inTable(CityModel.TABLE_NAME);
      table.uuid(col("stateId", false)).references(StateModel.col("id", false)).inTable(StateModel.TABLE_NAME);
      table.string(col("zip", false));
      table.text(col("address1", false));
      table.text(col("address2", false));
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(DropTablePostgresql(TABLE_NAME));
}

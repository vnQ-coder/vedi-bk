import Knex, { Transaction } from "knex";
import DateFormatDao from "../../../../modules/shared/dao/daoDateFormat";
import DateFormatModel from "../../../../modules/shared/models/modelDateFormat";

export const seed = function (knex: Knex): Promise<DateFormatModel[]> {
  return new DateFormatDao().upsertMany(knex as Transaction, [
    {
      id: "2278602d-e8b0-4f75-a2ca-addca611ab1f",
      dateFormat: "MM DD YYYY",
    },
    {
      id: "7d12793a-5970-41b6-ac3f-2f97be8bb0ff",
      dateFormat: "DD MM YYYY",
    },
  ]);
};

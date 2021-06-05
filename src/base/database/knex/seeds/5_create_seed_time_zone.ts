import Knex, { Transaction } from "knex";
import TimeZoneDao from "../../../../modules/vendorAdmin/adminAndTools/shared/dao/daoTimeZone";
import TimeZoneModel from "../../../../modules/vendorAdmin/adminAndTools/shared/models/modelTimeZone";

export const seed = function (knex: Knex): Promise<TimeZoneModel[]> {
  return new TimeZoneDao().upsertMany(knex as Transaction, [
    {
      id: "4321cac9-f3ce-4fef-af73-a4b8c4158ecb",
      timeZone: "Etc/GMT+12",
    },
    {
      id: "47a4ea40-7e4e-46cc-be87-f0ae26f0dd85",
      timeZone: "Etc/GMT+11",
    },
    {
      id: "3bbc445e-2adc-4cf5-b89e-3b969abed50e",
      timeZone: "Pacific/Midway",
    },
    {
      id: "b84acee4-3547-4306-bf91-9c69ceda1315",
      timeZone: "Pacific/Niue",
    },
    {
      id: "03c9457d-4d76-4bc4-94be-fd61f95d5848",
      timeZone: "Pacific/Pago_Pago",
    },
    {
      id: "7aec0cb4-0c3a-455a-8bda-c7d8d75a54e5",
      timeZone: "Pacific/Samoa",
    },
  ]);
};

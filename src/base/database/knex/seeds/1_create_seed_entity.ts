import Knex, { Transaction } from "knex";
import EntityDao from "../../../../modules/shared/dao/daoEntity";
import EntityModel from "../../../../modules/shared/models/modelEntity";

export const seedSuperAdminId = "25805b18-a292-459b-b973-8066a07cce28";
export const seedVendorId = "2fdda4dd-d5bc-4138-88e0-bc1cccb6414d";
export const seedSupplierId = "64fadb12-0f64-486f-8edd-c66acb00baed";

export const seed = function (knex: Knex): Promise<EntityModel[]> {
  return new EntityDao().upsertMany(knex as Transaction, [
    {
      id: seedSuperAdminId,
      type: "super-admin",
      status: "active",
    },
    {
      id: seedVendorId,
      type: "vendor",
      status: "active",
    },
    {
      id: seedSupplierId,
      type: "supplier",
      status: "active",
    },
  ]);
};

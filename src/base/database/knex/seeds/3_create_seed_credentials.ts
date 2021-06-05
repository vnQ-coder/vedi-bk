import Knex, { Transaction } from "knex";
import CredentialDao from "../../../../modules/shared/dao/daoCredential";
import CredentialModel from "../../../../modules/shared/models/modelCredential";
import BcryptHashing from "../../../../modules/shared/service/Bcrypt";
import { seedVendorId, seedSupplierId, seedSuperAdminId } from "./1_create_seed_entity";

export const seedSuperAdminCredentialId = "e87745ed-2890-4ce6-b493-a20fe2dd19be";
export const seedVendorCredentialId = "befd84ae-24da-4ebb-b7de-a678dc66e13a";
export const seedSupplierCredentialId = "d97d2272-a202-43ed-b2e0-a2883b61728f";

export const seed = async function (knex: Knex): Promise<CredentialModel[]> {
  return new CredentialDao().upsertMany(knex as Transaction, [
    {
      id: seedSuperAdminCredentialId,
      entityId: seedSuperAdminId,
      userName: "admin",
      password: await BcryptHashing.bcryptHash("admin123"),
    },
    {
      id: seedVendorCredentialId,
      entityId: seedVendorId,
      userName: "vendor",
      password: await BcryptHashing.bcryptHash("admin123"),
    },
    {
      id: seedSupplierCredentialId,
      entityId: seedSupplierId,
      userName: "supplier",
      password: await BcryptHashing.bcryptHash("admin123"),
    },
  ]);
};

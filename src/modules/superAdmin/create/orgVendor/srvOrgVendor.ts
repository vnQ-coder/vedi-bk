import { Transaction } from "knex";
import CredentialDao from "../../../shared/dao/daoCredential";
import EntityDao from "../../../shared/dao/daoEntity";
import EntityAddressDetailsDao from "../../../shared/dao/daoEntityAddressDetails";
import EntityUrlDao from "../../../shared/dao/daoEntityUrl";
import OrgDetailsDao from "../../../shared/dao/daoOrgDetails";
import UnprocessableEntityError from "../../../shared/errors/UnprocessableEntityError";
import EntityAddressDetailsModel from "../../../shared/models/modelEntityAddressDetails";
import BcryptHashing from "../../../shared/service/Bcrypt";
import ServiceCountriesStateCities from "../../../shared/service/serviceCountriesStateCities";
import OrgCredentialsService from "../../../shared/service/serviceOrgCredentials";
import { FiltersType } from "../../../shared/types/sharedTypes";
import EntityContactDetailsDao from "../../../vendorAdmin/adminAndTools/shared/dao/daoEntityContactDetails";
import UserAdministrationService
  from "../../../vendorAdmin/adminAndTools/userAdministration/serviceAddUserAdministration";
import { OrgVendorRegRequestType } from "../../shared/types/OrgTypes";
import OrgVendorDao from "./orgVendorDao";

class OrgVendorService {
  static async addOrgVendor(
    trx: Transaction,
    payload: OrgVendorRegRequestType,
  ):Promise<string> {
    if (await new CredentialDao().existsByPredicate(trx, { userName: payload.userName })) {
      throw new UnprocessableEntityError("The username is already exists!");
    }

    // add into entity
    const [entityModel] = await new EntityDao().insertOne(trx, { type: "vendor", status: "active" });
    const entityId = entityModel.id as string;

    const { country, state, city } = await ServiceCountriesStateCities.getCountriesStateCitiesByNames(
      trx, payload.country, payload.state, payload.city,
    );

    await Promise.all([
      // add into org details (name)
      new OrgDetailsDao().insertOne(trx, {
        entityId,
        name: payload.name,
      }),

      // add into entity url (www)
      new EntityUrlDao().insertOne(trx, {
        entityId,
        url: payload.www,
        type: "normal",
      }),

      // add into or get from entity_contact_details (phone)
      new EntityContactDetailsDao().insertOne(trx, {
        entityId, value: payload.phone, type: "PERSONAL", contactType: "PHONE",
      }),

      // add into or get from entity_contact_details (fax)
      new EntityContactDetailsDao().insertOne(trx, {
        entityId, value: payload.phone, type: "PERSONAL", contactType: "FAX",
      }),

      // add into address
      new EntityAddressDetailsDao().insertOne(trx, {
        entityId,
        zip: payload.zip,
        countryId: country?.id,
        stateId: state?.id,
        cityId: city?.id,
        address1: payload.address1,
        address2: payload.address2,
      } as Required<EntityAddressDetailsModel>),
    ]);

    await UserAdministrationService.registerUser(trx, {
      name: "Administrator",
      userName: payload.userName,
      status: "active",
      email: "",
      language: "English",
      password: await BcryptHashing.bcryptHash(payload.password),
    }, entityId, "vuser");

    return entityId;
  }

  static async updateOrgVendor(
    trx: Transaction,
    entityId: string,
    payload: OrgVendorRegRequestType,
  ):Promise<void> {
    const orgDetailsModel = await new OrgDetailsDao().findOneByCol(trx, "entityId", entityId);
    if (orgDetailsModel) {
      await OrgCredentialsService.checkAndUpdateEntityCredentials(trx, payload.userId, {
        userName: payload.userName,
        password: payload.password,
      });

      const { country, state, city } = await ServiceCountriesStateCities.getCountriesStateCitiesByNames(
        trx, payload.country, payload.state, payload.city,
      );

      await Promise.all([
        new OrgDetailsDao().updateOneByColName(trx, { name: payload.name }, "entityId", entityId),
        new EntityUrlDao().updateOneByColName(trx, { url: payload.www }, "entityId", entityId),
        new EntityContactDetailsDao().updateOneByPredicate(trx,
          { value: payload.phone }, { entityId, contactType: "PHONE" }),
        new EntityContactDetailsDao().updateOneByPredicate(trx,
          { value: payload.fax }, { entityId, contactType: "FAX" }),
        new EntityAddressDetailsDao().updateOneByColName(trx, {
          zip: payload.zip,
          address1: payload.address1,
          address2: payload.address2,
          countryId: country?.id,
          stateId: state?.id,
          cityId: city?.id,
        }, "entityId", entityId),
      ]);
    }
  }

  static async getOrgVendors(trx: Transaction, filter: FiltersType):Promise<OrgVendorRegRequestType[]> {
    return OrgVendorDao.getOrgVendorsExceptDeleted(trx, filter);
  }

  static async getOrgVendorByEntity(
    trx: Transaction, entityId: string,
  ):Promise<OrgVendorRegRequestType> {
    return OrgVendorDao.getOrgVendorExceptDeletedByEntity(trx, entityId);
  }

  static async deleteOrg(trx: Transaction, entityId: string):Promise<void> {
    await new EntityDao().updateOneById(trx, { status: "deleted" }, entityId);
  }
}

export default OrgVendorService;

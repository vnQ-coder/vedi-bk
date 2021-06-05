import { Transaction } from "knex";
import CredentialDao from "../../../shared/dao/daoCredential";
import DateFormatDao from "../../../shared/dao/daoDateFormat";
import EntityDao from "../../../shared/dao/daoEntity";
import EntityAddressDetailsDao from "../../../shared/dao/daoEntityAddressDetails";
import OrgDetailsDao from "../../../shared/dao/daoOrgDetails";
import OrgOrgDao from "../../../shared/dao/daoOrgOrg";
import UnprocessableEntityError from "../../../shared/errors/UnprocessableEntityError";
import EntityAddressDetailsModel from "../../../shared/models/modelEntityAddressDetails";
import BcryptHashing from "../../../shared/service/Bcrypt";
import ServiceCountriesStateCities from "../../../shared/service/serviceCountriesStateCities";
import OrgCredentialsService from "../../../shared/service/serviceOrgCredentials";
import { FiltersType } from "../../../shared/types/sharedTypes";
import EntityContactDetailsDao from "../../../vendorAdmin/adminAndTools/shared/dao/daoEntityContactDetails";
import LanguageDao from "../../../vendorAdmin/adminAndTools/shared/dao/daoLanguage";
import TimeZoneDao from "../../../vendorAdmin/adminAndTools/shared/dao/daoTimeZone";
import UserPreferenceDao from "../../../vendorAdmin/adminAndTools/shared/dao/daoUserPreference";
import UserAdministrationService
  from "../../../vendorAdmin/adminAndTools/userAdministration/serviceAddUserAdministration";
import { OrgSupplierRegRequestType } from "../../shared/types/OrgTypes";
import OrgSupplierManagerDao from "./daoOrgSupplierManager";

class OrgSupplierService {
  static async addOrgSupplier(
    trx: Transaction, payload: OrgSupplierRegRequestType,
  ):Promise<{ entityId: string }> {
    if (await new CredentialDao().existsByPredicate(trx, { userName: payload.userName })) {
      throw new UnprocessableEntityError("The username is already exists!");
    }

    if (await new OrgDetailsDao().existsByPredicate(trx, { name: payload.name })) {
      throw new UnprocessableEntityError("The supplier with this name is already exists!");
    }

    // find org vendor
    const orgVendor = await new OrgDetailsDao().findOneByCol(trx, "name", payload.vendor);

    // add into entity
    const [entityModel] = await new EntityDao().insertOne(trx, { type: "supplier", status: "active" });
    const entityId = entityModel.id as string;

    const { country, state, city } = await ServiceCountriesStateCities.getCountriesStateCitiesByNames(
      trx, payload.country, payload.state, payload.city,
    );

    await Promise.all([
      // add into org org
      new OrgOrgDao().insertOne(trx, {
        vendorId: orgVendor.entityId,
        supplierId: entityId,
      }),
      // add into org details (name)
      new OrgDetailsDao().insertOne(trx, {
        entityId,
        name: payload.name,
      }),
      // add into or get from entity_contact_details (phone & fax)
      new EntityContactDetailsDao().insertMany(trx, [
        {
          entityId, value: payload.phone, type: "PERSONAL", contactType: "PHONE",
        },
        {
          entityId, value: payload.phone, type: "PERSONAL", contactType: "FAX",
        },
      ]),

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
      email: payload.emailAddress,
      language: payload.language,
      password: await BcryptHashing.bcryptHash(payload.password),
      timezone: payload.timeZone,
      dateFormat: payload.dateFormat,
    }, entityId, "suser");

    return { entityId };
  }

  static getOrgSuppliers(
    trx: Transaction, filters: FiltersType,
  ):Promise<OrgSupplierRegRequestType[]> {
    return OrgSupplierManagerDao.getOrgSuppliersExceptDeleted(trx, filters);
  }

  static async updateOrgSupplier(
    trx: Transaction,
    entityId: string,
    payload: OrgSupplierRegRequestType,
  ):Promise<void> {
    const orgDetailsModel = await new OrgDetailsDao().findOneByCol(trx, "entityId", entityId);
    if (payload.name !== orgDetailsModel.name
      && await new OrgDetailsDao().findOneByCol(trx, "name", payload.name)) {
      throw new UnprocessableEntityError("The supplier with this name is already exists!");
    }

    await OrgCredentialsService.checkAndUpdateEntityCredentials(trx, payload.userId, {
      userName: payload.userName,
      password: payload.password,
    });

    // find org vendor
    const orgVendor = await new OrgDetailsDao().findOneByCol(trx, "name", payload.vendor);
    if (orgVendor.entityId !== payload.vendorEntityId) {
      await new OrgOrgDao().updateOneByPredicate(
        trx,
        { vendorId: orgVendor.entityId },
        {
          vendorId: payload.vendorEntityId,
          supplierId: entityId,
        },
      );
    }
    const { country, state, city } = await ServiceCountriesStateCities.getCountriesStateCitiesByNames(
      trx, payload.country, payload.state, payload.city,
    );

    if (payload.userId) {
      const timezoneModel = await new TimeZoneDao().findOneByCol(trx, "timeZone", payload.timeZone);
      const dateFormatModel = await new DateFormatDao().findOneByCol(trx, "dateFormat", payload.dateFormat);
      const languageModel = await new LanguageDao().findOneByCol(trx, "language", payload.language);

      await new UserPreferenceDao().updateOneByColName(trx, {
        timeZoneId: timezoneModel ? timezoneModel.id : null,
        dateFormatId: dateFormatModel ? dateFormatModel.id : null,
        languageId: languageModel ? languageModel.id : null,
      }, "entityId", payload.userId);
    }

    await Promise.all([
      new OrgDetailsDao().updateOneByColName(trx, { name: payload.name }, "entityId", entityId),
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
      new EntityContactDetailsDao().updateOneByPredicate(trx, {
        value: payload.phone,
      }, { entityId, contactType: "EMAIL", type: "PRIMARY" }),
    ]);
  }

  static async deleteOrg(trx: Transaction, entityId: string):Promise<void> {
    await new EntityDao().updateOneById(trx, { status: "deleted" }, entityId);
  }

  static async getOrgSupplierByEntity(
    trx: Transaction, entityId: string,
  ):Promise<OrgSupplierRegRequestType> {
    return OrgSupplierManagerDao.getOrgSupplierExceptDeletedByEntity(trx, entityId);
  }
}

export default OrgSupplierService;

import { QueryBuilder, Transaction } from "knex";
import CityModel from "../../../shared/models/modelCity";
import CountryModel from "../../../shared/models/modelCountry";
import DateFormatModel from "../../../shared/models/modelDateFormat";
import EntityModel from "../../../shared/models/modelEntity";
import EntityAddressDetailsModel from "../../../shared/models/modelEntityAddressDetails";
import OrgDetailsModel from "../../../shared/models/modelOrgDetails";
import OrgOrgModel from "../../../shared/models/modelOrgOrg";
import OrgUserModel from "../../../shared/models/modelOrgUser";
import StateModel from "../../../shared/models/modelState";
import { FiltersType } from "../../../shared/types/sharedTypes";
import { filterableData } from "../../../shared/utils/dbUtils";
import EntityContactDetailsModel from "../../../vendorAdmin/adminAndTools/shared/models/modelEntityContactDetails";
import LanguageModel from "../../../vendorAdmin/adminAndTools/shared/models/modelLanguage";
import TimeZoneModel from "../../../vendorAdmin/adminAndTools/shared/models/modelTimeZone";
import UserPreferenceModel from "../../../vendorAdmin/adminAndTools/shared/models/modelUserPreference";
import OrgManagerDao from "../../shared/dao/daoOrgManager";
import { OrgSupplierRegRequestType } from "../../shared/types/OrgTypes";

class OrgSupplierManagerDao {
  static getOrgSuppliersExceptDeleted(
    trx: Transaction, filters?: FiltersType,
  ):QueryBuilder<OrgSupplierRegRequestType[]> {
    const qb = OrgManagerDao.getOrgDetails(trx)
      .select([
        TimeZoneModel.col("timeZone"),
        DateFormatModel.col("dateFormat"),
        `ecd2.${EntityContactDetailsModel.col("value", false)} as emailAddress`,
        LanguageModel.col("language"),
        `od1.${OrgDetailsModel.col("name", false)} as vendor`,
        `od1.${OrgDetailsModel.col("entityId", false)} as vendorEntityId`,
      ])
      .leftJoin(OrgOrgModel.TABLE_NAME, OrgOrgModel.col("supplierId"), EntityModel.col("id"))
      .leftJoin(
        `${OrgDetailsModel.TABLE_NAME} as od1`,
        `od1.${OrgDetailsModel.col("entityId", false)}`,
        OrgOrgModel.col("vendorId"),
      )
      .leftJoin(
        `${EntityModel.TABLE_NAME} as vendorEntity`,
        `vendorEntity.${EntityModel.col("id", false)}`,
        OrgOrgModel.col("vendorId"),
      )
      .leftJoin(UserPreferenceModel.TABLE_NAME, UserPreferenceModel.col("entityId"), OrgUserModel.col("userId"))
      .leftJoin(DateFormatModel.TABLE_NAME, DateFormatModel.col("id"), UserPreferenceModel.col("dateFormatId"))
      .leftJoin(TimeZoneModel.TABLE_NAME, TimeZoneModel.col("id"), UserPreferenceModel.col("timeZoneId"))
      .leftJoin(LanguageModel.TABLE_NAME, LanguageModel.col("id"), UserPreferenceModel.col("languageId"))
      .leftJoin(`${EntityContactDetailsModel.TABLE_NAME} as ecd2`, function () {
        this.on(`ecd2.${EntityContactDetailsModel.col("entityId", false)}`, OrgUserModel.col("userId"))
          .andOn(`ecd2.${EntityContactDetailsModel.col("contactType", false)}`,
            trx.raw("?", EntityContactDetailsModel.contactType("EMAIL")))
          .andOn(`ecd2.${EntityContactDetailsModel.col("type", false)}`,
            trx.raw("?", EntityContactDetailsModel.type("PRIMARY")));
      })
      .whereNot(EntityModel.col("status"), "=", EntityModel.status("deleted"))
      .whereNot(`vendorEntity.${EntityModel.col("status", false)}`, "=", EntityModel.status("deleted"))
      .where(EntityModel.col("type"), EntityModel.type("supplier"));

    const colsTableMappings = {
      name: OrgDetailsModel.TABLE_NAME,
      "zip|address1|address2": EntityAddressDetailsModel.TABLE_NAME,
      "phone:value": EntityContactDetailsModel.TABLE_NAME,
      "fax:value": EntityContactDetailsModel.TABLE_NAME,
      country: CountryModel.TABLE_NAME,
      state: StateModel.TABLE_NAME,
      city: CityModel.TABLE_NAME,
      language: LanguageModel.TABLE_NAME,
      dateFormat: DateFormatModel.TABLE_NAME,
      timeZone: TimeZoneModel.TABLE_NAME,
      "emailAddress:value": "ecd2",
      "vendor:name": "od1",
    };

    if (filters) {
      filterableData(
        qb,
        filters,
        colsTableMappings,
      );
    }

    return qb;
  }

  static getOrgSupplierExceptDeletedByEntity(
    trx: Transaction, entityId: string,
  ):Promise<OrgSupplierRegRequestType> {
    return OrgSupplierManagerDao.getOrgSuppliersExceptDeleted(trx)
      .where(EntityModel.col("id"), entityId)
      .first();
  }
}

export default OrgSupplierManagerDao;

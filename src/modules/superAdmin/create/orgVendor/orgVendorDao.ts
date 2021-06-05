import { QueryBuilder, Transaction } from "knex";
import CityModel from "../../../shared/models/modelCity";
import CountryModel from "../../../shared/models/modelCountry";
import EntityModel from "../../../shared/models/modelEntity";
import EntityAddressDetailsModel from "../../../shared/models/modelEntityAddressDetails";
import EntityUrlModel from "../../../shared/models/modelEntityUrl";
import OrgDetailsModel from "../../../shared/models/modelOrgDetails";
import StateModel from "../../../shared/models/modelState";
import { FiltersType } from "../../../shared/types/sharedTypes";
import { filterableData } from "../../../shared/utils/dbUtils";
import EntityContactDetailsModel from "../../../vendorAdmin/adminAndTools/shared/models/modelEntityContactDetails";
import OrgManagerDao from "../../shared/dao/daoOrgManager";
import { OrgVendorRegRequestType } from "../../shared/types/OrgTypes";

class OrgVendorDao {
  static getOrgVendorsExceptDeleted(trx: Transaction, filters?: FiltersType):QueryBuilder<OrgVendorRegRequestType[]> {
    const qb = OrgManagerDao.getOrgDetails(trx)
      .select([
        trx.ref(EntityUrlModel.col("url")).as("www"),
      ])
      .leftJoin(EntityUrlModel.TABLE_NAME, EntityUrlModel.col("entityId"), EntityModel.col("id"))
      .whereNot(EntityModel.col("status"), "=", EntityModel.status("deleted"))
      .where(EntityModel.col("type"), EntityModel.type("vendor"));
    const colsTableMappings = {
      name: OrgDetailsModel.TABLE_NAME,
      "zip|address1|address2": EntityAddressDetailsModel.TABLE_NAME,
      "phone:value": EntityContactDetailsModel.TABLE_NAME,
      "fax:value": EntityContactDetailsModel.TABLE_NAME,
      country: CountryModel.TABLE_NAME,
      state: StateModel.TABLE_NAME,
      city: CityModel.TABLE_NAME,
      "www:url": EntityUrlModel.TABLE_NAME,
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

  static getOrgVendorExceptDeletedByEntity(
    trx: Transaction,
    entityId: string,
  ):Promise<OrgVendorRegRequestType> {
    return OrgVendorDao.getOrgVendorsExceptDeleted(trx)
      .where(EntityModel.col("id"), entityId)
      .first();
  }
}

export default OrgVendorDao;
/*
console.log(filterableData(
  knex(EntityModel.TABLE_NAME),
  filters,
  colsTableMappings,
).toQuery());
*/

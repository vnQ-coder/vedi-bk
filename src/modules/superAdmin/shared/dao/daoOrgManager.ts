import { QueryBuilder, Transaction } from "knex";
import CityModel from "../../../shared/models/modelCity";
import CountryModel from "../../../shared/models/modelCountry";
import CredentialModel from "../../../shared/models/modelCredential";
import EntityModel from "../../../shared/models/modelEntity";
import EntityAddressDetailsModel from "../../../shared/models/modelEntityAddressDetails";
import OrgDetailsModel from "../../../shared/models/modelOrgDetails";
import OrgUserModel from "../../../shared/models/modelOrgUser";
import StateModel from "../../../shared/models/modelState";
import EntityContactDetailsModel from "../../../vendorAdmin/adminAndTools/shared/models/modelEntityContactDetails";

class OrgManagerDao {
  static getOrgDetails(trx: Transaction):QueryBuilder {
    return trx(EntityModel.TABLE_NAME)
      .select([
        EntityModel.col("id"),
        OrgDetailsModel.col("name"),
        OrgUserModel.col("userId"),
        CredentialModel.col("userName"),
        trx.ref(EntityContactDetailsModel.col("value")).as("phone"),
        trx.ref(`ecd1.${EntityContactDetailsModel.col("value", false)}`).as("fax"),
        EntityAddressDetailsModel.col("address1"),
        EntityAddressDetailsModel.col("address2"),
        EntityAddressDetailsModel.col("zip"),
        trx.ref(CountryModel.col("country")),
        trx.ref(CityModel.col("city")),
        trx.ref(StateModel.col("state")),
      ])
      .leftJoin(OrgUserModel.TABLE_NAME, OrgUserModel.col("orgId"), EntityModel.col("id"))
      .leftJoin(CredentialModel.TABLE_NAME, CredentialModel.col("entityId"), OrgUserModel.col("userId"))
      .leftJoin(OrgDetailsModel.TABLE_NAME, OrgDetailsModel.col("entityId"), EntityModel.col("id"))
      .leftJoin(EntityContactDetailsModel.TABLE_NAME, function () {
        this.on(EntityContactDetailsModel.col("entityId"), EntityModel.col("id"))
          .andOn(EntityContactDetailsModel.col("contactType"), trx.raw("?", EntityContactDetailsModel.contactType("PHONE")));
      })
      .leftJoin(`${EntityContactDetailsModel.TABLE_NAME} as ecd1`, function () {
        this.on(`ecd1.${EntityContactDetailsModel.col("entityId", false)}`, EntityModel.col("id"))
          .andOn(`ecd1.${EntityContactDetailsModel.col("contactType", false)}`,
            trx.raw("?", EntityContactDetailsModel.contactType("FAX")));
      })
      .leftJoin(EntityAddressDetailsModel.TABLE_NAME,
        EntityAddressDetailsModel.col("entityId"), EntityModel.col("id"))
      .leftJoin(CountryModel.TABLE_NAME, CountryModel.col("id"), EntityAddressDetailsModel.col("countryId"))
      .leftJoin(CityModel.TABLE_NAME, CityModel.col("id"), EntityAddressDetailsModel.col("cityId"))
      .leftJoin(StateModel.TABLE_NAME, StateModel.col("id"), EntityAddressDetailsModel.col("stateId"))
      .orderBy(EntityModel.col("created_at"), "desc");
  }
}

export default OrgManagerDao;

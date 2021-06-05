import { QueryBuilder, Transaction } from "knex";
import VuserPoDetailModel from "../../vendorAdmin/adminAndTools/shared/models/modelVuserPoDetail";
import BaseDao from "../../../base/dao/BaseDao";
import EntityContactDetailsModel from "../../vendorAdmin/adminAndTools/shared/models/modelEntityContactDetails";
import UserPersonalDetailsModel from "../../vendorAdmin/adminAndTools/shared/models/modelUserPersonalDetails";
import CredentialModel from "../models/modelCredential";
import EntityModel from "../models/modelEntity";
import OrgDetailsModel from "../models/modelOrgDetails";
import OrgUserModel from "../models/modelOrgUser";
import UserPreferenceModel from "../../vendorAdmin/adminAndTools/shared/models/modelUserPreference";
import UserTypeModel from "../../vendorAdmin/adminAndTools/userAdministration/modelUserType";
import LanguageModel from "../../vendorAdmin/adminAndTools/shared/models/modelLanguage";
import EntityContactDetailsDao from "./daoEntityContactDetails";
import UserEmailPreferencesModel from "../../vendorAdmin/adminAndTools/shared/models/modelUserEmailPreferences";
import EmailPreferenceModel from "../../vendorAdmin/adminAndTools/editProfile/modelEmailPreference";

class OrgDao extends BaseDao<EntityModel> {
  constructor() {
    super(EntityModel.TABLE_NAME);
  }

  getAllVendorUserByVendorId(trx: Transaction, vendorId: string): QueryBuilder {
    return trx(EntityModel.TABLE_NAME)
      .leftJoin(
        OrgUserModel.TABLE_NAME,
        OrgUserModel.col("userId"),
        EntityModel.col("id"),
      )
      .leftJoin(
        CredentialModel.TABLE_NAME,
        CredentialModel.col("entityId"),
        OrgUserModel.col("userId"),
      )
      .leftJoin(EntityContactDetailsModel.TABLE_NAME, function singleEmail() {
        this.on(
          EntityContactDetailsModel.col("id"),
          "=",
          new EntityContactDetailsDao().queryGetEntityContactDetailByEntity(trx),
        );
      })
      .leftJoin(
        UserPersonalDetailsModel.TABLE_NAME,
        UserPersonalDetailsModel.col("entityId"),
        OrgUserModel.col("userId"),
      )
      .select([
        trx.ref(OrgUserModel.col("userId")).as("id"),
        trx.ref(UserPersonalDetailsModel.col("firstName")).as("name"),
        CredentialModel.col("userName"),
        trx.ref(EntityContactDetailsModel.col("value")).as("email"),
        this.col("status"),
      ])
      .where(OrgUserModel.col("orgId"), vendorId);
  }

  getVendorUserDetailsById(trx: Transaction, entityId: string): QueryBuilder {
    return trx(this.tableName)
      .leftJoin(
        OrgUserModel.TABLE_NAME,
        OrgUserModel.col("userId"),
        EntityModel.col("id"),
      )
      .leftJoin(
        CredentialModel.TABLE_NAME,
        CredentialModel.col("entityId"),
        OrgUserModel.col("userId"),
      )
      .leftJoin(EntityContactDetailsModel.TABLE_NAME, function () {
        this.on(EntityContactDetailsModel.col("entityId"), OrgUserModel.col("userId"))
          .andOn(EntityContactDetailsModel.col("contactType"), trx.raw("?", EntityContactDetailsModel.contactType("PHONE")));
      })
      .leftJoin(`${EntityContactDetailsModel.TABLE_NAME} as ecd1`, function () {
        this.on(`ecd1.${EntityContactDetailsModel.col("entityId", false)}`, OrgUserModel.col("userId"))
          .andOn(`ecd1.${EntityContactDetailsModel.col("type", false)}`,
            trx.raw("?", EntityContactDetailsModel.type("BACKUP")))
          .andOn(`ecd1.${EntityContactDetailsModel.col("contactType", false)}`,
            trx.raw("?", EntityContactDetailsModel.contactType("EMAIL")));
      })
      .leftJoin(
        UserPersonalDetailsModel.TABLE_NAME,
        UserPersonalDetailsModel.col("entityId"),
        OrgUserModel.col("userId"),
      )
      .leftJoin(
        VuserPoDetailModel.TABLE_NAME,
        VuserPoDetailModel.col("entityId"),
        OrgUserModel.col("userId"),
      )
      .leftJoin(
        UserTypeModel.TABLE_NAME,
        UserTypeModel.col("entityId"),
        OrgUserModel.col("userId"),
      )
      .leftJoin(
        UserPreferenceModel.TABLE_NAME,
        UserPreferenceModel.col("entityId"),
        OrgUserModel.col("userId"),
      )
      .leftJoin(
        LanguageModel.TABLE_NAME,
        LanguageModel.col("id"),
        UserPreferenceModel.col("languageId"),
      )
      .leftJoin(
        UserEmailPreferencesModel.TABLE_NAME,
        UserEmailPreferencesModel.col("entityId"),
        OrgUserModel.col("userId"),
      )
      .leftJoin(
        EmailPreferenceModel.TABLE_NAME,
        EmailPreferenceModel.col("id"),
        UserEmailPreferencesModel.col("mailTypeId"),
      )
      .select([
        trx.ref(OrgUserModel.col("userId")).as("id"),
        trx.ref(UserPersonalDetailsModel.col("firstName")).as("name"),
        CredentialModel.col("userName"),
        this.col("status"),
        VuserPoDetailModel.col("poEmail"),
        VuserPoDetailModel.col("poEmail2"),
        VuserPoDetailModel.col("poPrefix"),
        VuserPoDetailModel.col("poPrefix2"),
        UserPersonalDetailsModel.col("title"),
        UserTypeModel.col("type"),
        LanguageModel.col("language"),
        trx.ref(EntityContactDetailsModel.col("value")).as("phone"),
        trx.ref(`ecd1.${EntityContactDetailsModel.col("value", false)}`).as("backupEmail"),
        LanguageModel.col("language"),
        EmailPreferenceModel.col("mailType"),
      ])
      .groupBy([
        OrgUserModel.col("userId"),
        UserPersonalDetailsModel.col("firstName"),
        CredentialModel.col("userName"),
        this.col("status"),
        VuserPoDetailModel.col("poEmail"),
        VuserPoDetailModel.col("poEmail2"),
        VuserPoDetailModel.col("poPrefix"),
        VuserPoDetailModel.col("poPrefix2"),
        UserPersonalDetailsModel.col("title"),
        UserTypeModel.col("type"),
        LanguageModel.col("language"),
        LanguageModel.col("id"),
        EmailPreferenceModel.col("mailType"),
        EntityContactDetailsModel.col("value"),
        `ecd1.${EntityContactDetailsModel.col("value", false)}`,
      ])
      .where(EntityContactDetailsModel.col("entityId"), entityId)
      .first();
  }

  getAllVendorNames(trx: Transaction):Promise<string[]> {
    return trx(this.tableName)
      .join(
        OrgDetailsModel.TABLE_NAME,
        OrgDetailsModel.col("entityId"),
        EntityModel.col("id"),
      ).pluck(OrgDetailsModel.col("name"))
      .where(EntityModel.col("type"), EntityModel.type("vendor"))
      .andWhere(EntityModel.col("status"), EntityModel.status("active"));
  }
}

export default OrgDao;

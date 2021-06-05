import { Transaction } from "knex";
import DateFormatDao from "../../../shared/dao/daoDateFormat";
import EntityModel from "../../../shared/models/modelEntity";
import EntityDao from "../../../shared/dao/daoEntity";
import CredentialDao from "../../../shared/dao/daoCredential";
import LanguageDao from "../shared/dao/daoLanguage";
import TimeZoneDao from "../shared/dao/daoTimeZone";
import UserPersonalDetailsDao from "../shared/dao/daoUserPersonalDetails";
import UserPersonalDetailsModel from "../shared/models/modelUserPersonalDetails";
import UserTypeDao from "./daoUserType";
import UserTypeModel from "./modelUserType";
import EntityContactDetailsDao from "../shared/dao/daoEntityContactDetails";
import EntityContactDetailsModel from "../shared/models/modelEntityContactDetails";
import UserPrivilegesDao from "./daoUserPrivileges";
import UserPrivilegesModel from "./modelUserPrivileges";
import UserPreferenceDao from "../shared/dao/daoUserPreference";
import UserPreferenceModel from "../shared/models/modelUserPreference";
import {
  UserBodyType,
  UserResponseTypes,
  UserTypes,
  VendorUserType,
} from "../shared/types/adminAndToolsTypes";
import OrgUserDao from "../../../shared/dao/daoOrgUser";
import VuserPoDetailDao from "../shared/dao/daoVuserPoDetail";
import VuserPoDetailModel from "../shared/models/modelVuserPoDetail";
import { EntityType, StatusType } from "../../../shared/types/sharedTypes";
import UserEmailPreferencesDao from "../shared/dao/daoUserEmailPreferences";
import { seedPurchaseOrderId } from "../../../../base/database/knex/seeds/6_create_seed_email_preferences";
import EmailPreferenceDao from "../editProfile/daoEmailPreference";

class UserAdministrationService {
  static async registerUser(
    trx: Transaction,
    user: UserBodyType,
    orgId: string,
    userType: EntityType,
  ): Promise<UserResponseTypes> {
    const newUser = {
      id: "",
      name: "",
      userName: "",
      email: "",
      status: "",
      orgUserId: "",
    };
    const [entity] = await new EntityDao().insertOne(trx, {
      type: userType,
      status: user.status
        ? EntityModel.status("active")
        : EntityModel.status("inactive"),
    });
    const [
      [userCredential],
      [userDetails],
      [userContactDetail],
    ] = await Promise.all([
      new CredentialDao().insertOne(trx, {
        entityId: entity.id!,
        userName: user.userName,
        password: user.password,
      }),
      new UserPersonalDetailsDao().insertOne(trx, {
        entityId: entity.id!,
        firstName: user.name,
      } as UserPersonalDetailsModel),
      new EntityContactDetailsDao().insertMany(trx, [
        {
          entityId: entity.id!,
          contactType: EntityContactDetailsModel.contactType("EMAIL"),
          value: user.email,
          type: EntityContactDetailsModel.type("PRIMARY"),
        },
        {
          entityId: entity.id!,
          contactType: EntityContactDetailsModel.contactType("EMAIL"),
          value: user.email,
          type: EntityContactDetailsModel.type("BACKUP"),
        },
        {
          entityId: entity.id!,
          contactType: EntityContactDetailsModel.contactType("PHONE"),
          value: "",
          type: EntityContactDetailsModel.type("PRIMARY"),
        },
      ]),
      new UserPrivilegesDao().insertOne(trx, {
        entityId: entity.id!,
        privilege: UserPrivilegesModel.privilege("normal"),
      }),
      new UserEmailPreferencesDao().insertOne(trx, {
        entityId: entity.id!,
        mailTypeId: seedPurchaseOrderId,
      }),
      new UserPreferenceDao().insertOne(trx, {
        entityId: entity.id!,
        languageId: user.language ? await new LanguageDao()
          .findOneByCol(trx, "language", user.language, ["id"])
          .then((df) => df?.id) : null,
        showPurchaseOrderSummary: UserPreferenceModel.showPurchaseOrderSummary(
          "Yes",
        ),
        linePerPage: 10,
        dateFormatId: user.dateFormat ? await new DateFormatDao()
          .findOneByCol(trx, "dateFormat", user.dateFormat, ["id"])
          .then((df) => df?.id) : null,
        timeZoneId: user.timezone ? await new TimeZoneDao()
          .findOneByCol(trx, "timeZone", user.timezone, ["id"])
          .then((tz) => tz?.id) : null,
      }),
      new OrgUserDao().insertOne(trx, {
        orgId,
        userId: entity.id!,
      }),
      new UserTypeDao().insertOne(trx, {
        entityId: entity.id!,
        type: UserTypeModel.type("VU_TYPE_NORMAL"),
      }),
      new VuserPoDetailDao().insertOne(trx, {
        entityId: entity.id!,
      } as VuserPoDetailModel),
    ]);
    newUser.id = entity.id!;
    newUser.name = userDetails.firstName;
    newUser.userName = userCredential.userName;
    newUser.email = userContactDetail.value;
    newUser.status = entity.status;
    return newUser;
  }

  static async updateUser(
    trx: Transaction,
    user: VendorUserType,
  ): Promise<void> {
    const [backupEmailId, phoneId, emailPrefernces] = await Promise.all([
      new EntityContactDetailsDao().getEntityContactDetailIdByEntityIdAndType(trx, "BACKUP", "EMAIL", user.id),
      new EntityContactDetailsDao().getEntityContactDetailIdByEntityIdAndType(trx, "PRIMARY", "PHONE", user.id),
      new EmailPreferenceDao().findOneByCol(trx, "mailType", user.mailType, "id"),
    ]);
    await Promise.all([
      new EntityDao().updateOneByColName(
        trx,
        {
          status: user.status ? EntityModel.status("active") : EntityModel.status("inactive") as StatusType,
        },
        "id",
        user.id,
      ),
      new UserPersonalDetailsDao().updateOneByColName(
        trx,
        {
          title: user.title,
          firstName: user.name,
        },
        "entityId",
        user.id,
      ),
      new UserEmailPreferencesDao().updateOneByColName(
        trx,
        {
          mailTypeId: emailPrefernces.id,
        },
        "entityId",
        user.id,
      ),
      new EntityContactDetailsDao().updateOneByColName(
        trx,
        {
          value: user.backupEmail,
        },
        "id",
        backupEmailId.id,
      ),
      new EntityContactDetailsDao().updateOneByColName(
        trx,
        {
          value: user.phone,
        },
        "id",
        phoneId.id,
      ),
      new UserPreferenceDao().updateOneByColName(
        trx,
        {
          languageId: user.language ? await new LanguageDao()
            .findOneByCol(trx, "language", user.language, ["id"])
            .then((df) => df?.id) : null,
        },
        "entityId",
        user.id,
      ),
      new UserTypeDao().updateOneByColName(
        trx,
        {
          type: user.type as UserTypes,
        },
        "entityId",
        user.id,
      ),
      new VuserPoDetailDao().updateOneByColName(
        trx,
        {
          poPrefix: user.poPrefix,
          poPrefix2: user.poPrefix2,
          poEmail: user.poEmail,
          poEmail2: user.poEmail2,
        },
        "entityId",
        user.id,
      ),
    ]);
  }
}

export default UserAdministrationService;

import { DateFormatType, LanguagesListType } from "../../../../shared/types/sharedTypes";

export const ShowPurchaseSummaryType = ["Yes", "No"] as const;
export type PurchaseSummaryType = typeof ShowPurchaseSummaryType[number];

export const ContactDetailType = [
  "EMAIL",
  "PHONE",
  "FAX",
  "SMS",
  "URL",
] as const;
export type ContactType = typeof ContactDetailType[number];

export const ContactDetailInfoType = [
  "PRIMARY",
  "PERSONAL",
  "BACKUP",
] as const;
export type ContactInfoType = typeof ContactDetailInfoType[number];

export const UserPrivilegesType = ["admin", "normal"] as const;
export type PrivilegesType = typeof UserPrivilegesType[number];

export const UserAccountsType = [
  "VU_TYPE_NORMAL",
  "VU_TYPE_PURCHASING_AGENT",
  "VU_TYPE_EXECUTIVE",
  "VU_TYPE_PURCHASING_EXECUTIVE",
  "VU_TYPE_MANAGER",
  "VU_TYPE_PURCHASING_ENGINEER",
  "VU_TYPE_QUALITY_ENGINEER",
  "VU_TYPE_ACCOUNT_RESPONSIBLE",
  "VU_TYPE_ACCOUNT_RESPONSIBLE",
  "VU_TYPE_PROJECT_MANAGER",
  "VU_TYPE_ENG_APPR_ENGINEER",
  "VU_TYPE_ACCOUNT_SUPERVISOR",
  "VU_TYPE_ACCOUNT_EXPERT",
  "VU_TYPE_GOVERNANCE_EXPERT",
  "VU_TYPE_GOVERNANCE_MANAGER",
  "VU_TYPE_PERSONNEL",
  "VU_TYPE_QUALITY_ENGINEER_THIRD_PARTY",
  "VU_TYPE_OFFICE_COORDINATOR",
  "VU_TEAM_TO_DO_BUSINESS",
  "SU_TYPE_REGULAR",
  "SU_TYPE_RFQ",
] as const;
export type UserTypes = typeof UserAccountsType[number];

export const EmailsType = ["backup", "primary", "normal"] as const;
export type EmailType = typeof EmailsType[number];

export type LanguageType = {
  id: string;
  language: string;
};

export type UserBodyType = {
  name: string;
  userName: string;
  password: string;
  email: string;
  language: LanguagesListType;
  status: string;
  timezone?: string; // required in super supplier registration
  dateFormat?: DateFormatType; // required in super supplier registration
};

export type ChangePasswordType = {
  oldPassword : string,
  newPassword : string,
  confirmPassword : string,
}

export type UserResponseTypes = {
  id: string,
  name: string,
  userName: string,
  email: string,
  status: string,
}

export type VendorUserType = {
  id: string;
  name: string;
  userName: string;
  status: string;
  poEmail: string;
  poEmail2: string;
  poPrefix: string;
  poPrefix2: string;
  title: string;
  type: string;
  language: string;
  phone: string;
  backupEmail: string;
  mailType: string;
}

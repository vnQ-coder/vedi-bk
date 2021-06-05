export type LanguageType = { id: string, language: string };
export type TimeZoneType = { id: string, timeZone: string };
export type EmailPreferenceType = { id: string, mailType: string };

export type seedDataType = {
  label: string,
  value: string,
}

export type ChangeOtherInfoType = {
  dateFormat: seedDataType,
  emailAddress: string,
  emailAddress2: string,
  emailPrefernces: EmailPreferenceType,
  fax: string,
  language: LanguageType,
  linesPerPage: seedDataType,
  name: string,
  phone: number,
  poPrefixFilter1: string,
  poPrefixFilter2: string,
  systemUserNumber: string,
  timeZone: TimeZoneType,
  title: string,
  showPoSummary: boolean,
}

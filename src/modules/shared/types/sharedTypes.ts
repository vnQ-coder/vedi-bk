export const EntityRolesType = [
  "supplier",
  "vendor",
  "vuser",
  "suser",
  "scompany",
  "vcompany",
  "super-admin",
] as const;
export type EntityType = typeof EntityRolesType[number];

export const EntityStatusType = ["active", "inactive", "blocked", "deleted"] as const;
export type StatusType = typeof EntityStatusType[number];

export type SessionUserType = {
  entityId: string;
  type: string;
};

export const EntityUrlTypeList = [
  "personal",
  "normal",
] as const;
export type EntityUrlType = typeof EntityUrlTypeList[number];

export type FiltersType = {
  filters: {
    field: string;
    operator: "contains"|"doesnotcontain"|"eq"|"neq"|"startswith"|"endswith"|"isnull"|"isnotnull"|"isempty"|"isnotempty";
    value: string;
  }[],
  skip: number;
  take: number;
  sort: {
    field: string;
    dir: "asc"|"desc";
  };
}

export const DateFormatTypeList = [
  "MM DD YYYY",
  "DD MM YYYY",
] as const;
export type DateFormatType = typeof DateFormatTypeList[number];

export const TimeZonesList = [
  "Etc/GMT+12",
  "Etc/GMT+11",
  "Pacific/Midway",
  "Pacific/Niue",
  "Pacific/Pago_Pago",
  "Pacific/Samoa",
] as const;
export type TimeZonesListType = typeof TimeZonesList[number];

export const LanguagesList = [
  "English",
  "Deutsch",
  "Français",
  "Italiano",
  "Türkçe",
  "Português",
  "中文",
  "Русский",
  "Polski",
  "Español",
  "عربى",
] as const;
export type LanguagesListType = typeof LanguagesList[number];

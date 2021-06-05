import { DateFormatType, LanguagesListType } from "../../../shared/types/sharedTypes";

type CommonOrgReqType = {
  id: string,
  name: string,
  userName: string,
  password: string,
  address1: string,
  address2: string,
  city: string,
  state: string,
  zip: string,
  phone: string,
  fax: string,
  country: string,
  userId: string,
}

export interface OrgVendorRegRequestType extends CommonOrgReqType {
  www: string,
}

export interface OrgSupplierRegRequestType extends CommonOrgReqType {
  id: string,
  vendorId: string,
  vendor: string,
  language: LanguagesListType,
  emailAddress: string,
  timeZone: string,
  dateFormat: DateFormatType,
  vendorEntityId: string,
}

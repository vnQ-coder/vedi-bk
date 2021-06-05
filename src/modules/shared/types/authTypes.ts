export type LoginAuthenticationType = {
  isAuthenticated: boolean;
  entityId: string;
  entityType: string;
};

export type SupplierType = [
  "NORMAL",
  "CUSTOMER",
  "CARRIER",
  "SELLER",
  "RFQA",
  "AGENCY",
  "FINANCE",
  "FORWARDER",
  "MANUFACTURER"
];

export type LoginBodyType = {
  code: string;
  userName: string;
  password: string;
};

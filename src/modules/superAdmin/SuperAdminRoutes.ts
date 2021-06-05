import express from "express";
import OrgSupplierCtr from "./create/orgSupplier/ctrOrgSupplier";
import supplierRegBodyValidationsMW from "./create/orgSupplier/vldOrgSupplier";
import OrgVendorCtr from "./create/orgVendor/ctrOrgVendor";
import vendorRegBodyValidationsMW from "./create/orgVendor/vldOrgVendor";

const SuperAdminRouter = express.Router();

// Vendor
SuperAdminRouter.post("/org/vendors", vendorRegBodyValidationsMW, OrgVendorCtr.addOrgVendor);
SuperAdminRouter.get("/org/vendors", OrgVendorCtr.getOrgVendors);
SuperAdminRouter.get("/org/vendors/:entityId", OrgVendorCtr.getOrgVendorByEntity);
SuperAdminRouter.put("/org/vendors/:entityId", vendorRegBodyValidationsMW, OrgVendorCtr.updateOrgVendor);
SuperAdminRouter.delete("/org/vendors/:entityId", OrgVendorCtr.deleteOrgVendor);
// Supplier
SuperAdminRouter.post("/org/suppliers", supplierRegBodyValidationsMW, OrgSupplierCtr.addOrgSupplier);
SuperAdminRouter.get("/org/suppliers", OrgSupplierCtr.getOrgSuppliers);
SuperAdminRouter.get("/org/suppliers/:entityId", OrgSupplierCtr.getOrgSupplierByEntity);
SuperAdminRouter.put("/org/suppliers/:entityId", supplierRegBodyValidationsMW, OrgSupplierCtr.updateOrgSupplier);
SuperAdminRouter.delete("/org/suppliers/:entityId", OrgSupplierCtr.deleteOrgSupplier);

export default SuperAdminRouter;

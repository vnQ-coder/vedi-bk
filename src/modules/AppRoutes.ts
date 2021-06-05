import express from "express";

import {
  isAuthMW, isVendorMW,
} from "../base/middlewares/validation/AuthValidationMW";
import LoginCtr from "./auth/ctrLogin";
import loginBodyValidationsMW from "./auth/vldLoginBodyMW";
import SharedRouter from "./shared/routes/SharedRoutes";
import SuperAdminRouter from "./superAdmin/SuperAdminRoutes";
import EditProfileCtr from "./vendorAdmin/adminAndTools/editProfile/ctrEditProfile";
import ChangePasswordBodyValidationsMW from "./vendorAdmin/adminAndTools/editProfile/vldChangePasswordMW";
import AdminAndToolsSharedCtr from "./vendorAdmin/adminAndTools/shared/ctr/ctrShared";
import UserAdministrationCtr from "./vendorAdmin/adminAndTools/userAdministration/ctrUserAdministration";
import registerBodyValidationsMW from "./vendorAdmin/adminAndTools/userAdministration/vldAddUserMW";
import CurrencyRateCtr from "./vendorAdmin/masterData/currencyRate/ctrCurrencyRate";

const AppRouter = express.Router();

// Auth Routes
AppRouter.post("/login", loginBodyValidationsMW, LoginCtr.login);
AppRouter.get("/logout", isAuthMW, LoginCtr.logout);

// User Session Routes
AppRouter.get("/user", isAuthMW, LoginCtr.getUserSessionDetails);

// User Administration Routes
AppRouter.post("/vusers", isAuthMW, isVendorMW, registerBodyValidationsMW, UserAdministrationCtr.addUser);
AppRouter.get("/vusers", isAuthMW, isVendorMW, UserAdministrationCtr.getAllVusers);
AppRouter.get("/vuser-details/:id", UserAdministrationCtr.getVendorUserDetailsById);
AppRouter.post("/vuser-details", UserAdministrationCtr.updateVendorUserDetailsById);

// shared Routes
AppRouter.get("/email-preferences", isAuthMW, AdminAndToolsSharedCtr.getAllMailtypes);

// Currency Rate
AppRouter.post("/currency-rate", isAuthMW, CurrencyRateCtr.getCurrencyRate);

// Change Password
AppRouter.post("/change-password", isAuthMW, ChangePasswordBodyValidationsMW, EditProfileCtr.changePassword);

// Edit Prole
AppRouter.post("/edit-vuser", isAuthMW, isVendorMW, EditProfileCtr.editProfile);

// Super Admin
AppRouter.use("/super-admin", SuperAdminRouter);
// Shared
AppRouter.use("/shared", SharedRouter);

export default AppRouter;

import express from "express";
import CountriesStateCitiesCtr from "../ctr/ctrCountriesStateCities";
import DateFormatCtr from "../ctr/ctrDateFormats";
import LanguageCtr from "../ctr/ctrLanguage";
import OrgCtr from "../ctr/ctrOrg";
import TimeZoneCtr from "../ctr/ctrTimeZone";

const SharedRouter = express.Router();

SharedRouter.get("/countries", CountriesStateCitiesCtr.getAllCountries);
SharedRouter.get("/states", CountriesStateCitiesCtr.getAllStatesByCountry);
SharedRouter.get("/cities", CountriesStateCitiesCtr.getAllCitiesByCountryAndState);

SharedRouter.get("/org-vendors", OrgCtr.getAllVendors);

SharedRouter.get("/date-formats", DateFormatCtr.getAllDateFormats);
SharedRouter.get("/languages", LanguageCtr.getAllLanguages);
SharedRouter.get("/time-zone", TimeZoneCtr.getAllTimeZones);

export default SharedRouter;

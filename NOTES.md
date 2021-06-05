VNQ
===
Task Name : CRUD For Vendor User
1. Procuring Comp field on update user details page showing list of vendor companies and then relate these companies with that respective vendor user in vendor relation company table. but we can trace where we can save vendor companies in vendor company table.
2. there is field name system user number on update user details page which is related to jwt so where we can store it in our case.
3. Department list is showing on update user details which is not in our scope right but will be later.
4. Product subgroup list is showing on update user details which is not in our scope right but will be later.

UAK
===
1. super-admin/org/vendor displaying one extra super vendor which is the seeded one  
Create Supplier by Super Admin
1. create supplier by super-admin what is a supplier number not confirmed hence not inserting
2. Not allow creating new supplier If same supplier number is given
3. while creating supplier there are 3 addresses of that supplier each has different role one address 
   is his general address, the second one is SHIP_FROM and the third one is SHIP_TO each holding the same
   details while creating the supplier

Usage filter
const colsTableMappings = {
name: OrgDetailsModel.col("name"),
   // if more than one column corresponds to the same table then use pipe, Note: if one of the column has alias in query then move that into
   // selection, like f.e, if zip is alias in our query above but actual name in table is zipCode then simply select in separate line with alias
   // like: "zip:zipCode": EntityAddressDetailsModel.TABLE_NAME
   "zip|address1|address2": EntityAddressDetailsModel.TABLE_NAME,
   "phone:value": EntityContactDetailsModel.TABLE_NAME,
   "fax:value": EntityContactDetailsModel.TABLE_NAME,
   // left side of colon is alias and right side of it actual column in db table
   "country:name": CountryModel.TABLE_NAME,
   "state:name": StateModel.TABLE_NAME,
   "city:name": CityModel.TABLE_NAME,
   "www:url": EntityUrlModel.TABLE_NAME,
};

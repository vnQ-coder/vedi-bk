import * as Knex from "knex";
import csc from "country-state-city";
import CountryModel from "../../../../modules/shared/models/modelCountry";

export async function seed(knex: Knex): Promise<any> {
  return knex(CountryModel.TABLE_NAME).first().then((firstCountry) => {
    if (!firstCountry) {
      const countriesList:CountryModel[] = csc.getAllCountries().map((country) => ({
        country: country.name,
        isoCode: country.isoCode,
        phonecode: country.phonecode,
      } as CountryModel));

      knex(CountryModel.TABLE_NAME).insert(countriesList).then();
    }
  });
}

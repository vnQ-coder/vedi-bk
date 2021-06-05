import * as Knex from "knex";
import csc from "country-state-city";
import CityModel from "../../../../modules/shared/models/modelCity";
import { arrayToChunks } from "../../../../modules/shared/utils/arrayUtils";

export async function seed(knex: Knex): Promise<any> {
  return knex(CityModel.TABLE_NAME).first().then((firstCity) => {
    if (!firstCity) {
      const citiesList: CityModel[] = csc.getAllCities().map((city) => ({
        city: city.name,
        stateCode: city.stateCode,
        countryCode: city.countryCode,
      } as CityModel));

      // Note: Sql restrict inserts to maximum rows and in order to add cities (which is huge) we have to insert in batches
      const citiesChunksList = arrayToChunks(citiesList, 10000);
      citiesChunksList.map((chunks) => knex(CityModel.TABLE_NAME).insert(chunks).then());
    }
  });
}

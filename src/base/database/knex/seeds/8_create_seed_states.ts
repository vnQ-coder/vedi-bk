import * as Knex from "knex";
import csc from "country-state-city";
import StateModel from "../../../../modules/shared/models/modelState";

export async function seed(knex: Knex): Promise<any> {
  return knex(StateModel.TABLE_NAME).first().then((firstState) => {
    if (!firstState) {
      const statesList: StateModel[] = csc.getAllStates().map((state) => ({
        state: state.name,
        isoCode: state.isoCode,
        countryCode: state.countryCode,
      } as StateModel));

      knex(StateModel.TABLE_NAME).insert(statesList).then();
    }
  });
}

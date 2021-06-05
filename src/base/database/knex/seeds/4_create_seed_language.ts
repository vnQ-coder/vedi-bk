import Knex, { Transaction } from "knex";
import LanguageDao from "../../../../modules/vendorAdmin/adminAndTools/shared/dao/daoLanguage";
import LanguageModel from "../../../../modules/vendorAdmin/adminAndTools/shared/models/modelLanguage";

export const seed = function (knex: Knex): Promise<LanguageModel[]> {
  return new LanguageDao().upsertMany(knex as Transaction, [
    {
      id: "c21666ff-a501-4474-ad1e-3eb8d86bd1d9",
      language: "English",
    },
    {
      id: "a8372f55-79a4-4ce9-95e6-a15d7e7a957f",
      language: "Deutsch",
    },
    {
      id: "14236b9b-45dc-4ef7-ad99-04fc6aca5011",
      language: "Français",
    },
    {
      id: "2e8270b0-3339-48d0-a471-396161461f5f",
      language: "Italiano",
    },
    {
      id: "723f0b7f-53b2-4c09-837f-b141751f0845",
      language: "Türkçe",
    },
    {
      id: "01d294ab-b64b-4223-a147-a18256540639",
      language: "Português",
    },
    {
      id: "07c2539d-88f3-46fa-9f6e-ef334729aad4",
      language: "中文",
    },
    {
      id: "ab750fb7-7b61-47f9-950a-f53e99658dbf",
      language: "Русский",
    },
    {
      id: "09476d23-a090-4364-b1c8-a358cfe8fc8e",
      language: "Polski",
    },
    {
      id: "98aa93e5-0767-4899-965b-82a746fee939",
      language: "Español",
    },
    {
      id: "9c736a67-ff2f-48f0-9b88-eb87e1b81422",
      language: "عربى",
    },
  ]);
};

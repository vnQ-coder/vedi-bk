import BaseModel from "../../../../../base/model/BaseModel";
import { LanguagesListType } from "../../../../shared/types/sharedTypes";

class LanguageModel extends BaseModel {
  static TABLE_NAME = "languages";

  constructor(
    public language: LanguagesListType,
    id?: string,
  ) {
    super(id);
  }

  static col(k: keyof LanguageModel, prefix = true): string {
    return prefix ? `${LanguageModel.TABLE_NAME}.${k}` : k;
  }

  static languageType(k: LanguageModel["language"]): LanguageModel["language"] {
    return k;
  }
}

export default LanguageModel;

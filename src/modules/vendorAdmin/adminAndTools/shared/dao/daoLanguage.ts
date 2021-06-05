import BaseDao from "../../../../../base/dao/BaseDao";
import LanguageModel from "../models/modelLanguage";

class LanguageDao extends BaseDao<LanguageModel> {
  constructor() {
    super(LanguageModel.TABLE_NAME);
  }
}

export default LanguageDao;

import BaseDao from "../../../../base/dao/BaseDao";
import EmailPreferenceModel from "./modelEmailPreference";

class EmailPreferenceDao extends BaseDao<EmailPreferenceModel> {
  constructor() {
    super(EmailPreferenceModel.TABLE_NAME);
  }
}

export default EmailPreferenceDao;

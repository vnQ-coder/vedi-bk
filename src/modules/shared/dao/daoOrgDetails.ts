import BaseDao from "../../../base/dao/BaseDao";
import OrgDetailsModel from "../models/modelOrgDetails";

class OrgDetailsDao extends BaseDao<OrgDetailsModel> {
  constructor() {
    super(OrgDetailsModel.TABLE_NAME);
  }
}

export default OrgDetailsDao;

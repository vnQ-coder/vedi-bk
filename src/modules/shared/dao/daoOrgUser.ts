import BaseDao from "../../../base/dao/BaseDao";
import OrgUserModel from "../models/modelOrgUser";

class OrgUserDao extends BaseDao<OrgUserModel> {
  constructor() {
    super(OrgUserModel.TABLE_NAME);
  }
}

export default OrgUserDao;

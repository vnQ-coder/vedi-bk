import BaseDao from "../../../base/dao/BaseDao";
import OrgOrgModel from "../models/modelOrgOrg";

class OrgOrgDao extends BaseDao<OrgOrgModel> {
  constructor() {
    super(OrgOrgModel.TABLE_NAME);
  }
}

export default OrgOrgDao;

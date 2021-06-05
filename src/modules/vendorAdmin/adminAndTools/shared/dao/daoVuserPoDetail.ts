import BaseDao from "../../../../../base/dao/BaseDao";
import VuserPoDetailModel from "../models/modelVuserPoDetail";

class VuserPoDetailDao extends BaseDao<VuserPoDetailModel> {
  constructor() {
    super(VuserPoDetailModel.TABLE_NAME);
  }
}

export default VuserPoDetailDao;

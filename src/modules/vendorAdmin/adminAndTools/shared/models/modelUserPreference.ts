import BaseModel from "../../../../../base/model/BaseModel";
import { PurchaseSummaryType } from "../types/adminAndToolsTypes";

class UserPreferenceModel extends BaseModel {
  static TABLE_NAME = "user_preferences";

  constructor(
    public entityId: string,
    public languageId: string|null,
    public showPurchaseOrderSummary: PurchaseSummaryType,
    public linePerPage: number,
    public dateFormatId?: string|null,
    public timeZoneId?: string|null,
    id?: string,
  ) {
    super(id);
  }

  static col(k: keyof UserPreferenceModel, prefix = true): string {
    return prefix ? `${UserPreferenceModel.TABLE_NAME}.${k}` : k;
  }

  static showPurchaseOrderSummary(k: UserPreferenceModel["showPurchaseOrderSummary"]): PurchaseSummaryType {
    return k as PurchaseSummaryType;
  }
}

export default UserPreferenceModel;

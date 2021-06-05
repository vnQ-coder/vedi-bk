import BaseModel from "../../../../base/model/BaseModel";

class CurrencyRateModel extends BaseModel {
  static TABLE_NAME = "currency_rate";

  constructor(
    public name: string,
    public buyingRate: number,
    public date: string,
    public sellingRate: number,
    public unit: number,
    id?: string
  ) {
    super(id)
  }

  static col(k: keyof CurrencyRateModel, prefix = true): string {
    return prefix ? `${CurrencyRateModel.TABLE_NAME}.${k}` : k;
  }
}

export default CurrencyRateModel;

import { QueryBuilder, Transaction } from "knex";
import BaseDao from "../../../../base/dao/BaseDao";
import { PaginationType } from "../shared/types/currencyRateTypes";
import CurrencyRateModel from "./modelCurrencyRate";

class CurrencyRateDao extends BaseDao<CurrencyRateModel> {
  constructor() {
    super(CurrencyRateModel.TABLE_NAME);
  }

  getCurrencyRate(
    trx: Transaction,
    data: PaginationType,
  ): QueryBuilder<CurrencyRateModel> {
    return trx(this.tableName)
      .select([
        this.col("name"),
        this.col("buyingRate"),
        this.col("date"),
        this.col("sellingRate"),
        this.col("unit"),
      ])
      .limit(data.take).offset(data.skip)
  }

  getTotalRows(
    trx: Transaction,
  ): QueryBuilder<CurrencyRateModel> {
    return trx(this.tableName)
      .select().count('*').first()
  }
}

export default CurrencyRateDao;

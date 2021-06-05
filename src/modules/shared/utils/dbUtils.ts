import { QueryBuilder, Transaction } from "knex";
import BaseModel from "../../../base/model/BaseModel";
import { FiltersType } from "../types/sharedTypes";

export const findOrCreate = <T extends BaseModel> (
  trx: Transaction,
  tableName: string,
  where: Record<string, string>,
  elseInsertRecord: T,
):Promise<T> => trx(tableName).where(where).first().then(async (record) => {
    if (record) {
      return record;
    }
    return trx(tableName).insert(elseInsertRecord).returning("*")
      .then(([insertedRecord]) => insertedRecord);
  });

export const filterableData = (
  qb: QueryBuilder, filters: FiltersType, colsTableMappings: Record<string, string|any>,
):any => {
  const getPredicate = (field: string, operator: FiltersType["filters"][0]["operator"], value: string) => {
    switch (operator) {
      case "contains": qb.andWhere(field, "ILIKE", `%${value}%`); break;
      case "doesnotcontain": qb.andWhere(field, "NOT ILIKE", `%${value}%`); break;
      case "eq": qb.andWhere(field, value); break;
      case "neq": qb.whereNot(field, value); break;
      case "startswith": qb.andWhere(field, "ILIKE", `${value}%`); break;
      case "endswith": qb.andWhere(field, "ILIKE", `%${value}`); break;
      case "isnull": qb.whereNull(field); break;
      case "isnotnull": qb.whereNotNull(field); break;
      case "isempty": qb.where(field, ""); break;
      case "isnotempty": qb.whereNot(field, ""); break;
      default: break;
    }
  };
  const findColumnName = (ctM: Record<string, string>, field: string) => {
    const keys = Object.keys(ctM);
    let foundTableName = "";
    for (let i = 0; i <= keys.length; i += 1) {
      if (keys[i]) {
        if (keys[i].indexOf("|") !== -1) {
          const cols = keys[i].split("|");
          if (cols.includes(field)) {
            foundTableName = `${ctM[keys[i]]}.${field}`;
            break;
          }
        } else if (keys[i].indexOf(":") !== -1 && keys[i].startsWith(field)) {
          const [, dbColName] = keys[i].split(":"); // [alias, dbColName]
          foundTableName = `${ctM[keys[i]]}.${dbColName}`;
          break;
        }
      }
    }
    return foundTableName;
  };
  if (filters.filters && (filters.filters as any) !== "undefined") {
    const filtersList = (JSON.parse(filters.filters as any as string)) as FiltersType["filters"];
    filtersList.forEach((filter) => {
      let field = colsTableMappings[filter.field];
      if (!field) {
        field = findColumnName(colsTableMappings, filter.field);
        if (field) getPredicate(field, filter.operator, filter.value);
      } else {
        getPredicate(`${field}.${filter.field}`, filter.operator, filter.value);
      }
    });
  }

  if (filters.skip && filters.take) qb.offset(filters.skip).limit(filters.take);
  if (filters.sort && (filters.sort as any as string) !== "undefined" && (filters.sort as any as string) !== "null") {
    const sort = JSON.parse(filters.sort as any as string) as FiltersType["sort"];
    qb.orderBy(sort.field, sort.dir);
  }

  return qb;
};

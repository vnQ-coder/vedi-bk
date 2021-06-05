export const DropTablePostgresql = (tablename: string):string => `
  drop table ${tablename} cascade
`;

export const other = "";

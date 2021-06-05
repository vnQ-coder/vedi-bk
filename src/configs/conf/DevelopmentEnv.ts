abstract class DevelopmentEnv {
  static fullUrl: () => "";

  static host = (): string => "127.0.0.1";

  static port = (): string => "4321";

  static allowedOrigins = (): string[] => [
    "http://127.0.0.1:5321",
    "http://localhost:5321",
    "http://192.168.10.22:5312"
  ];
  
  static assetsPath = (): string => "public/assets/";

  static knex = {
    client: (): string => "pg",
    connection: {
      host: (): string => "127.0.0.1",
      user: (): string => "vedi",
      password: (): string => "vedi",
      database: (): string => "vedi",
      charset: (): string => "utf8",
    },
    migrations: {
      directory: ():string => "src/base/database/knex/migrations",
      extension: ():string => "ts",
    },
    seeds: {
      directory: ():string => "src/base/database/knex/seeds",
      extension: ():string => "ts",
    },
  };
  
  static fe = {
    cookieDomain: (): string => "",
    host: (): string => "",
    port: (): string => "5321",
    fullUrl: (): string => "",
  };
  
  static userRoles = {
    supplier : () : string => "supplier",
    supplierCode : () : number => 100000,
    vendor : () : string => "vendor",
    vendorCode : () : number => 50000,
  };


  static session = {
    secret: (): string => "secret_code",
    cookieName: (): string => "_vsrm",
    expireInMin: (): number => 60,
    redis: {
      host: (): string => "localhost",
      port: (): number => 6379,
    },
  };
}

export default DevelopmentEnv;

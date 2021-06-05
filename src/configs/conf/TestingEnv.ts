import DevelopmentEnv from "./DevelopmentEnv";

abstract class TestingConfigs extends DevelopmentEnv {
    static port = ():string => "4322";

    static knex = {
      client: ():string => "pg",
      connection: {
        host: ():string => "127.0.0.1",
        user: ():string => "projectname-test",
        password: ():string => "projectname-test",
        database: ():string => "projectname-test",
        charset: ():string => "utf8",
      },
    };
}

export default TestingConfigs;

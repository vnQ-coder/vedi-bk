import DevelopmentConfigs from "./conf/DevelopmentEnv";

export type APP_ENV = "development" | "testing";

class Configs {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getEnvConfig(_env: APP_ENV): typeof DevelopmentConfigs {
    return DevelopmentConfigs;
  }
}

export default Configs;

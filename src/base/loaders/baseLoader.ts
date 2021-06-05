import Configs, { APP_ENV } from "../../configs/AppEnvConfig";

export const env: APP_ENV|string = process.env.ENV ? process.env.ENV.trim() : "development";
export const appEnvConfig = Configs.getEnvConfig(env as APP_ENV);

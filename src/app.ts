import "regenerator-runtime/runtime";
import "core-js/stable";
import expressApp, {
  Response, Request, Errback, NextFunction,
} from "express";
import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";
import path from "path";
import knex from "./base/database/knex";
import { appEnvConfig } from "./base/loaders/baseLoader";
import AppRouter from "./modules/AppRoutes";
import BaseError from "./modules/shared/errors/BaseError";
import CommonI18n from "./modules/shared/i18n/en";
import MessageModel from "./modules/shared/models/response/modelRespMessage";

const express = expressApp();
const RedisStore = connectRedis(session);
const redisClient = redis.createClient();
const bodyParser = require!("body-parser");
const { port, allowedOrigins, session: sessionConf } = appEnvConfig;

console.log(process.env.ENV, "ENV");

express.enable("trust proxy");// for proxy servers like nginx to forward ip of requesters
express.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
express.use(bodyParser.json({ limit: "50mb" }));
express.set("json spaces", 2);
express.use(`/${appEnvConfig.assetsPath()}`,
  expressApp.static(path.join(__dirname, "../", appEnvConfig.assetsPath())));

express.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin || "";
  if (!origin || origin === "null" || allowedOrigins().includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
      "Content-Type, Authorization, Origin, X-Requested-With,Accept, x-api-version, x-csrf-token, cache-control, pragma");
    res.header("Access-Control-Allow-Credentials", "true");
    return next();
  }
  return res.status(400).json("{Either login, or use API key}").end();
});

express.use(session({
  secret: sessionConf.secret(),
  name: sessionConf.cookieName(),
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
  store: new RedisStore({
    host: sessionConf.redis.host(),
    port: sessionConf.redis.port(),
    client: redisClient,
    ttl: sessionConf.expireInMin() * 60000,
  }),
}));

redisClient.on("error", (err: Errback) => {
  console.log("Redis error: ", err);
});

express.use("/api", AppRouter);
express.get("/attachment", (req: Request, res: Response) => {
  const pathTo = path.resolve(req.query.path as string);
  res.download(pathTo);
});

express.use((err: Errback, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err);
  if ("getErrorCode" in err) {
    const e = err as BaseError;
    res.status(e.getErrorCode()).json(new MessageModel(e.getErrorMessage()));
  } else {
    res.status(422).json(new MessageModel(CommonI18n.serverError()));
  }
});

// CHECKING DATABASE CONNECTION
knex.raw("select 1+1 as result")
  .then(() => {
    console.log("Postgres Database Connected");
    express.listen(port(), () => { console.log(`Server is running on port ${port()}`); });
  })
  .catch(console.log);

module.exports = express;

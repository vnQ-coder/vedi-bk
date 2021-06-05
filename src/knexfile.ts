import { appEnvConfig } from "./base/loaders/baseLoader";

const {
  client, connection: {
    host, user, password, database, charset,
  },
} = appEnvConfig.knex;

module.exports = {
  client: client(),
  connection: {
    host: host(),
    user: user(),
    password: password(),
    database: database(),
    charset: charset(),
  },
  migrations: {
    directory: `${__dirname}/base/database/knex/migrations`,
  },
  seeds: {
    directory: `${__dirname}/base/database/knex/seeds`,
  },
};

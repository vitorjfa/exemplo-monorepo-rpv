import knex, { Knex } from "knex";

const config: Knex.Config = {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "root",
    database: "db_monorepo",
  },
  pool: {
    min: 2,
    max: 10,
  },
};

export const db: Knex = knex(config);

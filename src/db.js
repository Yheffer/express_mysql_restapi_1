import { createPool } from "mysql2/promise";
import { DB_DATABASE, DB_HOST, DB_USER, DB_PASSWORD } from "./config.js";

export const pool = createPool({
  database: DB_DATABASE,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});

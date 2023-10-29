import { config } from "dotenv";
config();

export const {
  PORT,
  ENV,
  DB_DATABASE,
  DB_DIALECT,
  DB_HOST,
  DB_PASSWORD,
  DB_USERNAME,
  DB_CONNECTIONSTRING,
  PAYLOADJWT,
  HOST,
} = process.env;

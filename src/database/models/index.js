import Sequelize from "sequelize";
import {
  DB_CONNECTIONSTRING,
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_USERNAME,
  ENV,
} from "../../config/envs.js";

// let sequelize
// if (ENV == "DEV") {
//   sequelize = new Sequelize({
//     database: DB_DATABASE,
//     username: DB_USERNAME,
//     password: DB_PASSWORD,
//     host: DB_HOST,
//     port: 5432,
//   });
// } else {
//   sequelize = new Sequelize(DB_CONNECTIONSTRING);
// }

// export default sequelize

// if (ENV == "DEV") {
//   const sequelize = new Sequelize({
//     database: DB_DATABASE,
//     username: DB_USERNAME,
//     password: DB_PASSWORD,
//     host: DB_HOST,
//     port: 5432,
//   });
// }
export const sequelize = new Sequelize(DB_CONNECTIONSTRING);
// export const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
//   host: "localhost",
//   dialect:
//     "postgres" /* one of  | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
// });

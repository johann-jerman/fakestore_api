import {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  DB_DIALECT,
} from "../../config/envs.js";

export default {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST_CONFIG,
    dialect: "postgres",
    migrationStorage: "sequelize",
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false, // Puedes ajustar esto según tus requisitos de seguridad
    //   },
    // },
    migrationStorageTableName: "sequelize_meta",
    seederStorage: "sequelize",
    seederStorageTableName: "sequelize_data",
    migrationStoragePath: "src/database/migrations",
    seederStoragePath: "src/database/seeders",
  },
  // production: {
  // username: DB_USERNAME,
  // password: DB_PASSWORD,
  // database: DB_DATABASE,
  // host: DB_HOST,
  // dialect: DB_DIALECT,
  // },
  // development: {
  // username: DB_USERNAME,
  // password: DB_PASSWORD,
  // database: DB_DATABASE,
  // host: DB_HOST,
  // dialect: DB_DIALECT,
  // },
  // test: {
  // username: DB_USERNAME,
  // password: DB_PASSWORD,
  // database: DB_DATABASE,
  // host: DB_HOST,
  // dialect: DB_DIALECT,
  // },
};

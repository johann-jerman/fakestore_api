"use strict";

import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
export const Rol = sequelize.define(
  "Rol",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rol: DataTypes.STRING,
  },
  {
    tableName: "Rols",
    timestamps: true,
    paranoid: true,
  }
);

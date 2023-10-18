'use strict';


import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
export const Image = sequelize.define(
  "Image",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: DataTypes.STRING
  },
  {
    tablename: "images",
    timestamp: true,
    paranoid: true
  }
)
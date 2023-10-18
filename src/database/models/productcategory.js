"use strict";

import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
export const ProductCategory = sequelize.define(
  "ProductCategory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category: DataTypes.STRING,
  },
  {
    tablename: "productcategories",
    timestamp: true,
    paranoid: true,
  }
);

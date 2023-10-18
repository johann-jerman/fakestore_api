'use strict';

import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
export const ImageProduct = sequelize.define(
  "ImageProduct",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER
  },
  {
    tablename: "imageproducts",
    timestamp: true,
    paranoid: true
  }
)
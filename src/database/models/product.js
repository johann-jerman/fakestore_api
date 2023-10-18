"use strict";

import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
import { ProductCategory } from "./productcategory.js";
// console.log(sequelize);
export const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    ProductCategoryId: DataTypes.INTEGER,
  },
  {
    tablename: "products",
    timestamp: true,
    paranoid: true,
  }
);

Product.belongsTo(ProductCategory, {
  foreignKey: "ProductCategoryId",
  targetId: "id",
  as: "category",
});

ProductCategory.hasMany(Product, {
  foreignKey: "ProductCategoryId",
  sourceKey: "id",
  as: "product",
});

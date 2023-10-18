"use strict";

import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
import { Rol } from "./rol.js";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    rolId: DataTypes.INTEGER,
  },
  {
    tablename: "users",
    timestamp: true,
    paranoid: true,
  }
);

User.belongsTo(Rol, {
  foreignkey: "rolId",
  targetId: "id",
  as: "category",
});

Rol.hasMany(User, {
  foreinkey: "rolId",
  sourceKey: "id",
  as: "user",
});

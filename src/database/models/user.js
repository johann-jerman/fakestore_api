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
    RolId: DataTypes.INTEGER,
  },
  {
    tableName: "Users",
    timestamps: true,
    paranoid: true,
  }
);

User.belongsTo(Rol, {
  foreignKey: "RolId",
  targetId: "id",
  as: "rol",
});

Rol.hasMany(User, {
  foreignKey: "RolId",
  sourceKey: "id",
  as: "user",
});

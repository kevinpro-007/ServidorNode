import { DataTypes } from "sequelize";
import sequelize from "../database/connection";
import { Rolmen } from "./rolmen";

export const Menu = sequelize.define(
    "menus", 
{
    codm: { type: DataTypes.INTEGER, primaryKey: true },
    nombre_menu: { type: DataTypes.STRING, allowNull: false },
    estado: { type: DataTypes.INTEGER, allowNull: false },
    iconos: { type: DataTypes.STRING, unique: true, allowNull: false }
});

Menu.hasMany(Rolmen, { foreignKey: 'codm', as: 'rolmen_codm' });

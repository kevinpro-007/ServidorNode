import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../database/connection";
import { Rol } from "./rol";


export const Rolmen = sequelize.define("rolmens",{
    codr: { type: DataTypes.INTEGER, primaryKey: true},
    codm: { type: DataTypes.INTEGER, primaryKey: true}
})

Rolmen.hasMany(Rol, { foreignKey: 'codr', as: 'Rol_codr' });

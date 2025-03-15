import { DataTypes } from "sequelize";
import sequelize from "../database/connection";


export const Rol = sequelize.define("rols",
 {
    codr:        { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_rol:      { type: DataTypes.STRING, allowNull: false },
    estado:    { type: DataTypes.INTEGER, allowNull: false }
});
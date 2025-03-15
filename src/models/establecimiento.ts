import { DataTypes } from "sequelize";
import sequelize from "../database/connection";


export const Establecimiento = sequelize.define("establecimientos", {
    id_establecimiento:        { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_establecimiento:      { type: DataTypes.STRING, allowNull: false },
    estado:    { type: DataTypes.INTEGER, allowNull: false }
});
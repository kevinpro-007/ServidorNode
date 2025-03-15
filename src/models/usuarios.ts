import { DataTypes } from "sequelize";
import sequelize from "../database/connection";
import { Establecimiento } from "./establecimiento";
import { Rol } from "./rol";

export const User = sequelize.define(
    "usuarios", 
{
    ci: { type: DataTypes.INTEGER, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    establecimiento_id:   { type: DataTypes.INTEGER, references: {  model: Establecimiento, key: 'id_establecimiento' },  allowNull: false },
    codr:   { type: DataTypes.INTEGER, references: {  model: Rol, key: 'codr' },  allowNull: false },
    estado: { type: DataTypes.INTEGER, allowNull: false },
});

Establecimiento.hasMany(User, { foreignKey: 'establecimiento_id', as: 'users' });
User.belongsTo(Establecimiento, { foreignKey: 'establecimiento_id', as: 'establecimientos' });

Rol.hasMany(User, { foreignKey: 'codr', as: 'users_rol' });
User.belongsTo(Rol, { foreignKey: 'codr', as: 'rol' });

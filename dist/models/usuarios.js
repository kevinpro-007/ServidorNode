"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const establecimiento_1 = require("./establecimiento");
const rol_1 = require("./rol");
exports.User = connection_1.default.define("usuarios", {
    ci: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true },
    nombre: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    apellido: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING, unique: true, allowNull: false },
    password: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    establecimiento_id: { type: sequelize_1.DataTypes.INTEGER, references: { model: establecimiento_1.Establecimiento, key: 'id_establecimiento' }, allowNull: false },
    codr: { type: sequelize_1.DataTypes.INTEGER, references: { model: rol_1.Rol, key: 'codr' }, allowNull: false },
    estado: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
});
establecimiento_1.Establecimiento.hasMany(exports.User, { foreignKey: 'establecimiento_id', as: 'users' });
exports.User.belongsTo(establecimiento_1.Establecimiento, { foreignKey: 'establecimiento_id', as: 'establecimientos' });
rol_1.Rol.hasMany(exports.User, { foreignKey: 'codr', as: 'users_rol' });
exports.User.belongsTo(rol_1.Rol, { foreignKey: 'codr', as: 'rol' });

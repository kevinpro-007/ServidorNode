"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const rolmen_1 = require("./rolmen");
exports.Menu = connection_1.default.define("menus", {
    codm: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true },
    nombre_menu: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    estado: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    iconos: { type: sequelize_1.DataTypes.STRING, unique: true, allowNull: false }
});
exports.Menu.hasMany(rolmen_1.Rolmen, { foreignKey: 'codm', as: 'rolmen_codm' });

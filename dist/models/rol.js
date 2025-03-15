"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rol = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
exports.Rol = connection_1.default.define("rols", {
    codr: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_rol: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    estado: { type: sequelize_1.DataTypes.INTEGER, allowNull: false }
});

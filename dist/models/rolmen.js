"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rolmen = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const rol_1 = require("./rol");
exports.Rolmen = connection_1.default.define("rolmens", {
    codr: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true },
    codm: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true }
});
exports.Rolmen.hasMany(rol_1.Rol, { foreignKey: 'codr', as: 'Rol_codr' });

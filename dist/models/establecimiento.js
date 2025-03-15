"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Establecimiento = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
exports.Establecimiento = connection_1.default.define("establecimientos", {
    id_establecimiento: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_establecimiento: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    estado: { type: sequelize_1.DataTypes.INTEGER, allowNull: false }
});

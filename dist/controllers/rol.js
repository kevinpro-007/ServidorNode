"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRol = exports.UpdateRol = exports.CreateRol = exports.ReadRolId = exports.ReadRol = void 0;
const rol_1 = require("../models/rol");
const ReadRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listRole = yield rol_1.Rol.findAll();
    res.json(listRole);
});
exports.ReadRol = ReadRol;
const ReadRolId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codr } = req.params;
    try {
        const role = yield rol_1.Rol.findOne({ where: { codr: codr } });
        if (!role) {
            return res.status(404).json({
                msg: `Rol con ID ${codr} no encontrada`
            });
        }
        return res.json({
            msg: `Rol con ID ${codr} encontrada exitosamente`,
            data: role
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: `Error al buscar la Rol con ID ${codr}`
        });
    }
});
exports.ReadRolId = ReadRolId;
const CreateRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_rol } = req.body;
    const role = yield rol_1.Rol.findOne({ where: { nombre_rol: nombre_rol } });
    if (role) {
        return res.status(400).json({
            msg: `Rol ${nombre_rol}, ya existe`
        });
    }
    try {
        rol_1.Rol.create({
            nombre_rol: nombre_rol,
            estado: 1
        });
        return res.json({
            msg: `Rol ${nombre_rol}, creada exitosamente`
        });
    }
    catch (error) {
        return res.json({
            msg: `Error al crear la Rol ${nombre_rol}`
        });
    }
});
exports.CreateRol = CreateRol;
const UpdateRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codr } = req.params;
    const { nombre_rol, estado } = req.body;
    try {
        const role = yield rol_1.Rol.findOne({ where: { codr: codr } });
        if (!role) {
            return res.status(404).json({
                msg: `Rol ${nombre_rol} no encontrada`
            });
        }
        yield rol_1.Rol.update({
            nombre_rol: nombre_rol,
            estado: estado
        }, { where: { codr: codr } });
        return res.json({
            msg: `Rol ${nombre_rol} actualizada exitosamente`
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: `Error al actualizar la Rol ${nombre_rol}`
        });
    }
});
exports.UpdateRol = UpdateRol;
const DeleteRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codr } = req.params;
    try {
        const role = yield rol_1.Rol.findOne({ where: { codr: codr } });
        if (!role) {
            return res.status(404).json({
                msg: `Rol con ID ${codr} no encontrada`
            });
        }
        yield rol_1.Rol.destroy({ where: { codr: codr } });
        return res.json({
            msg: `Rol con ID ${codr} eliminada exitosamente`
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: `Error al eliminar la Rol con ID ${codr}`
        });
    }
});
exports.DeleteRol = DeleteRol;

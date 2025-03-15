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
exports.DeleteEstablecimiento = exports.UpdateEstablecimiento = exports.CreateEstablecimiento = exports.ReadEstablecimientoId = exports.ReadEstablecimiento = void 0;
const establecimiento_1 = require("../models/establecimiento");
const ReadEstablecimiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listEstablecimiento = yield establecimiento_1.Establecimiento.findAll();
    //console.log(listEstablecimiento);
    res.json(listEstablecimiento);
    // res.json({
    //  msg: `List de categoría encontrada exitosamente`,
    // data: listEstablecimiento
    //});
});
exports.ReadEstablecimiento = ReadEstablecimiento;
const ReadEstablecimientoId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_establecimiento } = req.params;
    try {
        const establecimiento = yield establecimiento_1.Establecimiento.findOne({ where: { id_establecimiento: id_establecimiento } });
        if (!establecimiento) {
            return res.status(404).json({
                msg: `Establecimiento con ID ${id_establecimiento} no encontrada`
            });
        }
        return res.json({
            msg: `Establecimiento con ID ${id_establecimiento} encontrada exitosamente`,
            data: establecimiento
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: `Error al buscar la Establecimiento con ID ${id_establecimiento}`
        });
    }
});
exports.ReadEstablecimientoId = ReadEstablecimientoId;
const CreateEstablecimiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_establecimiento } = req.body;
    const establecimiento = yield establecimiento_1.Establecimiento.findOne({ where: { nombre_establecimiento: nombre_establecimiento } });
    if (establecimiento) {
        return res.status(400).json({
            msg: `Establecimiento: ${nombre_establecimiento}, ya existe`
        });
    }
    try {
        establecimiento_1.Establecimiento.create({
            nombre_establecimiento: nombre_establecimiento,
            estado: 1
        });
        return res.json({
            msg: `Establecimiento: ${nombre_establecimiento}, creada exitosamente`
        });
    }
    catch (error) {
        return res.json({
            msg: `Error al crear la Establecimiento: ${nombre_establecimiento}`
        });
    }
});
exports.CreateEstablecimiento = CreateEstablecimiento;
const UpdateEstablecimiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_establecimiento } = req.params;
    const { nombre_establecimiento, estado } = req.body;
    try {
        const establecimiento = yield establecimiento_1.Establecimiento.findOne({ where: { id_establecimiento: id_establecimiento } });
        if (!establecimiento) {
            return res.status(404).json({
                msg: `Establecimiento: ${nombre_establecimiento} no encontrada`
            });
        }
        yield establecimiento_1.Establecimiento.update({
            nombre_establecimiento: nombre_establecimiento,
            estado: estado
        }, { where: { id_establecimiento: id_establecimiento } });
        return res.json({
            msg: `Establecimiento: ${nombre_establecimiento} actualizada exitosamente`
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: `Error al actualizar la categoría ${nombre_establecimiento}`
        });
    }
});
exports.UpdateEstablecimiento = UpdateEstablecimiento;
const DeleteEstablecimiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_establecimiento } = req.params;
    try {
        const establecimiento = yield establecimiento_1.Establecimiento.findOne({ where: { id_establecimiento: id_establecimiento } });
        if (!establecimiento) {
            return res.status(404).json({
                msg: `Establecimiento: con ID ${id_establecimiento} no encontrada`
            });
        }
        yield establecimiento_1.Establecimiento.destroy({ where: { id_establecimiento: id_establecimiento } });
        return res.json({
            msg: `Establecimiento: con ID ${id_establecimiento} eliminada exitosamente`
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: `Error al eliminar la categoría con ID ${id_establecimiento}`
        });
    }
});
exports.DeleteEstablecimiento = DeleteEstablecimiento;

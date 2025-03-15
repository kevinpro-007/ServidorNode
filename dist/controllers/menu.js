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
exports.DeleteMenu = exports.UpdateMenu = exports.CreateMenu = exports.ReadMenuId = exports.MenusCodr = exports.ReadMenu = void 0;
const menu_1 = require("../models/menu");
const usuarios_1 = require("../models/usuarios");
const rolmen_1 = require("../models/rolmen");
const ReadMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listMenu = yield menu_1.Menu.findAll();
    res.json(listMenu);
    // res.json({
    //     msg: `List de menu encontrada exitosamente`,
    //     data: listmenu
    // });
});
exports.ReadMenu = ReadMenu;
const MenusCodr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    console.log("email llegando a la base de datos" + email);
    const datosPersonales = yield usuarios_1.User.findOne({ where: { email: email } });
    const codr = datosPersonales === null || datosPersonales === void 0 ? void 0 : datosPersonales.dataValues.codr;
    const data = yield menu_1.Menu.findAll({
        //attributes:['codr','nombre_rol'],           
        include: {
            model: rolmen_1.Rolmen,
            as: 'rolmen_codm',
            where: { codr: codr },
        },
    });
    res.json({
        data: data
    });
});
exports.MenusCodr = MenusCodr;
const ReadMenuId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codm } = req.params;
    try {
        const menu = yield menu_1.Menu.findOne({ where: { codm: codm } });
        if (!menu) {
            return res.status(404).json({
                msg: `Menu con ID ${codm} no encontrada`
            });
        }
        return res.json({
            msg: `Menu con ID ${codm} encontrada exitosamente`,
            data: menu
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: `Error al buscar la Menu con ID ${codm}`
        });
    }
});
exports.ReadMenuId = ReadMenuId;
const CreateMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_menu, iconos } = req.body;
    const menu = yield menu_1.Menu.findOne({ where: { nombre_menu: nombre_menu } });
    if (menu) {
        return res.status(400).json({
            msg: `Menu ${nombre_menu}, ya existe`
        });
    }
    try {
        menu_1.Menu.create({
            nombre_menu: nombre_menu,
            iconos: iconos,
            estado: 1
        });
        return res.json({
            msg: `Menu ${nombre_menu}, creada exitosamente`
        });
    }
    catch (error) {
        return res.json({
            msg: `Error al crear la Menu ${nombre_menu}`
        });
    }
});
exports.CreateMenu = CreateMenu;
const UpdateMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codm } = req.params;
    const { nombre_menu, iconos, estado } = req.body;
    try {
        const menu = yield menu_1.Menu.findOne({ where: { codm: codm } });
        if (!menu) {
            return res.status(404).json({
                msg: `Menu ${nombre_menu} no encontrada`
            });
        }
        yield menu_1.Menu.update({
            nombre_menu: nombre_menu,
            iconos: iconos,
            estado: estado
        }, { where: { codm: codm } });
        return res.json({
            msg: `Menu ${nombre_menu} actualizada exitosamente`
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: `Error al actualizar la Menu ${nombre_menu}`
        });
    }
});
exports.UpdateMenu = UpdateMenu;
const DeleteMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codm } = req.params;
    try {
        const menu = yield menu_1.Menu.findOne({ where: { codm: codm } });
        if (!menu) {
            return res.status(404).json({
                msg: `Menu con ID ${codm} no encontrada`
            });
        }
        yield menu_1.Menu.destroy({ where: { codm: codm } });
        return res.json({
            msg: `Menu con ID ${codm} eliminada exitosamente`
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: `Error al eliminar la Menu con ID ${codm}`
        });
    }
});
exports.DeleteMenu = DeleteMenu;

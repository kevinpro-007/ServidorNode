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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = exports.CreateUser = exports.datosUsuario = exports.ReadUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuarios_1 = require("../models/usuarios");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const rol_1 = require("../models/rol");
const ReadUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listUser = yield usuarios_1.User.findAll();
    res.json({
        msg: `List de categoría encontrada exitosamente`,
        data: listUser
    });
});
exports.ReadUser = ReadUser;
const datosUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    //console.log("email llegando a la base de datos"+ email);
    const datosPersonales = yield usuarios_1.User.findOne({ where: { email: email } });
    const codr = datosPersonales === null || datosPersonales === void 0 ? void 0 : datosPersonales.dataValues.codr;
    const rol = yield rol_1.Rol.findOne({ where: { codr: codr } });
    const nombreU = datosPersonales === null || datosPersonales === void 0 ? void 0 : datosPersonales.dataValues.nombre;
    const apellido = datosPersonales === null || datosPersonales === void 0 ? void 0 : datosPersonales.dataValues.apellido;
    const nombrerol = rol === null || rol === void 0 ? void 0 : rol.dataValues.nombre_rol;
    const data = { nombreU, apellido, nombrerol };
    /*
    const data= await Rol.findOne({
        
       attributes:['codr','nombre_rol'],
       where: { codr: codr }  ,
       include: {
            model:User,
          //as: 'users_rol',
           attributes:['ci','nombre','apellido'],
            where: { email: email }  ,
        },
    })
    */
    res.json({
        data: data
    });
});
exports.datosUsuario = datosUsuario;
const CreateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ci, nombre, apellido, email, password, establecimiento_id, codr } = req.body;
    const userci = yield usuarios_1.User.findOne({ where: { ci: ci } });
    const userEmail = yield usuarios_1.User.findOne({ where: { email: email } });
    //validacion en la base de datos con ci, email
    if (userci) {
        return res.status(400).json({
            msg: `Usuario ya existe con la Cedula de Identidad: ${ci}`
        });
    }
    if (userEmail) {
        return res.status(400).json({
            msg: `Usuario ya existe con el email: ${email}`
        });
    }
    const passwordHash = yield bcrypt_1.default.hash(password, 10);
    usuarios_1.User.create({
        ci: ci,
        nombre: nombre.toUpperCase(),
        apellido: apellido.toUpperCase(),
        email: email,
        password: passwordHash,
        establecimiento_id: establecimiento_id,
        codr: codr,
        estado: 1,
    });
    res.json({
        msg: `Usuario ${nombre} ${apellido} fue creado.`
    });
});
exports.CreateUser = CreateUser;
const LoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(req.body);
    const user = yield usuarios_1.User.findOne({ where: { email: email } });
    if (!user) {
        return res.status(400).json({
            msg: `Usuario no existe con el email ${email}`
        });
    }
    const passwordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: `Password Incorrecto => ${password}`
        });
    }
    const token = jsonwebtoken_1.default.sign({
        email: email
    }, process.env.SECRET_KEY || 'TSE-Edaniel-Valencia');
    res.json({ token });
});
exports.LoginUser = LoginUser;

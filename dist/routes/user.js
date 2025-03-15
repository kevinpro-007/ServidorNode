"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const validateToken_1 = __importDefault(require("./validateToken"));
const router = (0, express_1.Router)();
router.get("/api/usuario/read", validateToken_1.default, user_1.ReadUser);
router.post("/api/usuario/create", user_1.CreateUser);
router.post("/api/usuario/register", user_1.CreateUser);
router.post("/api/usuario/login", user_1.LoginUser);
router.get("/api/usuario/read_date:?", user_1.datosUsuario);
exports.default = router;

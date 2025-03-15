"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const establecimiento_1 = require("../controllers/establecimiento");
const validateToken_1 = __importDefault(require("./validateToken"));
const router = (0, express_1.Router)();
router.get("/api/establecimiento/read", validateToken_1.default, establecimiento_1.ReadEstablecimiento);
router.get("/api/establecimiento/read/:Cid", establecimiento_1.ReadEstablecimientoId);
router.post("/api/establecimiento/create", establecimiento_1.CreateEstablecimiento);
router.patch("/api/establecimiento/update/:Cid", establecimiento_1.UpdateEstablecimiento);
router.delete("/api/establecimiento/delete/:Cid", establecimiento_1.DeleteEstablecimiento);
exports.default = router;

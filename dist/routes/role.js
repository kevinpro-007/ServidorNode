"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_1 = require("../controllers/role");
const router = (0, express_1.Router)();
router.get("/api/role/read", role_1.ReadRole);
router.get("/api/role/read/:Rid", role_1.ReadRoleId);
router.post("/api/role/create", role_1.CreateRole);
router.patch("/api/role/update/:Rid", role_1.UpdateRole);
router.delete("/api/role/delete/:Rid", role_1.DeleteRole);
exports.default = router;

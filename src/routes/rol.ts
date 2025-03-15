import { Router } from "express";
import { CreateRol, DeleteRol, ReadRol, ReadRolId, UpdateRol } from "../controllers/rol";

const router = Router();

router.get("/api/rol/read", ReadRol)
router.get("/api/rol/read/:Rid", ReadRolId)
router.post("/api/rol/create", CreateRol)
router.patch("/api/rol/update/:Rid", UpdateRol)
router.delete("/api/rol/delete/:Rid", DeleteRol)

export default router

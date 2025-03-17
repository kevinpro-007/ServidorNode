import { Router } from "express";
import { CreateEstablecimiento, DeleteEstablecimiento, ReadEstablecimiento, ReadEstablecimientoId,  UpdateEstablecimiento } from "../controllers/establecimiento";
import validateToken from "./validateToken";

const router = Router();

router.get("/api/establecimiento/read",validateToken, ReadEstablecimiento)
router.get("/api/establecimiento/read/total", ReadEstablecimiento)
router.get("/api/establecimiento/read/:Cid", ReadEstablecimientoId)
router.post("/api/establecimiento/create", CreateEstablecimiento)
router.patch("/api/establecimiento/update/:Cid", UpdateEstablecimiento)
router.delete("/api/establecimiento/delete/:Cid", DeleteEstablecimiento)

export default router
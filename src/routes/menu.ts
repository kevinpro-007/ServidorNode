import { Router } from "express";
import { CreateMenu, DeleteMenu, MenusCodr, ReadMenu, ReadMenuId, UpdateMenu } from "../controllers/menu";

const router = Router();

router.get("/api/menu/read", ReadMenu)
router.get("/api/menu/read/:Cid", ReadMenuId)
router.post("/api/menu/create", CreateMenu)
router.patch("/api/menu/update/:Cid", UpdateMenu)
router.delete("/api/menu/delete/:Cid", DeleteMenu)

router.get("/api/menu/read_date:?", MenusCodr)

export default router
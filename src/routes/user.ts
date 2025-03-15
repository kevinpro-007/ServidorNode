import { Router } from "express";
import { CreateUser, datosUsuario, LoginUser, ReadUser } from "../controllers/user";
import validateToken from "./validateToken";

const router = Router();

router.get("/api/usuario/read", validateToken, ReadUser)
router.post("/api/usuario/create", CreateUser)
router.post("/api/usuario/register", CreateUser)
router.post("/api/usuario/login", LoginUser)

router.get("/api/usuario/read_date:?", datosUsuario)

export default router


import { Router } from "express";
import UserController from "../controllers/UsuarioController.js";

const userRoutes = Router();

const userController = new UserController();

userRoutes.post("/", userController.createUsuario);
userRoutes.post("/login", userController.login);

export default userRoutes;

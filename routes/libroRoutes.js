import { Router } from "express";
import LibroController from "../controllers/libroController";

const libroRoutes =  Router();
const libroController = new LibroController();


libroRoutes.get("/:getLibro",libroController.getLibrosByName);

export default userRoutes
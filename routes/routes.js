import { Router } from "express";
import userRoutes from "./userRoutes.js";
import libroRoutes from "./libroRoutes.js"

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/libros",libroRoutes);

export default routes;

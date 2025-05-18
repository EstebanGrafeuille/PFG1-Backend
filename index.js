import express from "express";
import dotenv from "dotenv";
import connectDB from "./connection/connection.js";
import routes from "./routes/routes.js";
import cookieParser from "cookie-parser";

dotenv.config(); // Carga las variables del .env

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Conexión a MongoDB
connectDB();

// Rutas
app.use("/app", routes);

// Levantar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

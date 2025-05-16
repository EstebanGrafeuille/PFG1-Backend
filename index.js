const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./connection/connection");

dotenv.config(); // Carga las variables del .env

const app = express();

// Middleware para recibir JSON
app.use(express.json());

// Conexión a MongoDB
connectDB();

// Ruta de prueba
app.use("/app", routes);

app.get("/", (req, res) => {
  res.send("API funcionando correctamente 🚀");
});

// Levantar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

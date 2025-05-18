import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Carga las variables del .env

const JWT_SECRET = process.env.JWT_SECRET;

export const genToken = (data) => {
  return jwt.sign({ data }, JWT_SECRET, { expiresIn: "1h" });
};

export const verificarToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

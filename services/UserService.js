import User from "../models/User.js";
import { genToken, verificarToken } from "../utils/token.js";

class UserService {
  getUserByIdService = async (id) => {
    try {
      const user = await User.findById(id).select("name email");
      if (!user) throw new Error("Usuario no encontrado");
      return user;
    } catch (error) {
      throw error;
    }
  };

  createUserService = async (userData) => {
    try {
      const newUser = new User(userData);
      await newUser.save();
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  updateUserService = async (data) => {
    try {
      const { id, name, password, email } = data;
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, password, email },
        { new: true }
      );
      if (!updatedUser) throw new Error("Usuario no encontrado");
      return { message: "Usuario actualizado" };
    } catch (error) {
      throw error;
    }
  };

  deleteUserService = async (id) => {
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) throw new Error("Usuario no encontrado");
      return { message: "Usuario eliminado exitosamente" };
    } catch (error) {
      throw error;
    }
  };

  loginService = async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Usuario no existe");

      const isMatch = await user.compare(password);
      if (!isMatch) throw new Error("Email o contraseña incorrectos");

      const payload = {
        id: user._id,
        email: user.email,
      };

      const token = genToken(payload);
      return token;
    } catch (error) {
      throw error;
    }
  };

  getMe = async (token) => {
    try {
      const verificado = verificarToken(token);
      return verificado.data;
    } catch (error) {
      throw error;
    }
  };
}

export default UserService;

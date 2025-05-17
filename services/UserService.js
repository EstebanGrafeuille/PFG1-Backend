import User from "../models/User.js";
import { genToken, verificarToken } from "../utils/token.js";

class UserService {
  getUserByIdService = async (id) => {
    const user = await User.findById(id).select("name email");
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  };

  createUserService = async (userData) => {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  };

  updateUserService = async (data) => {
    const { id, name, password, email } = data;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, password, email },
      { new: true }
    );
    if (!updatedUser) throw new Error("Usuario no encontrado");
    return { message: "Usuario actualizado" };
  };

  deleteUserService = async (id) => {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) throw new Error("Usuario no encontrado");
    return { message: "Usuario eliminado exitosamente" };
  };

  loginService = async ({ email, password }) => {
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
  };

  getMe = async (token) => {
    const verificado = verificarToken(token);
    return verificado.data;
  };
}

export default UserService;

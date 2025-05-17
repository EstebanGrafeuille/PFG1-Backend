import UserService from "../services/UserService.js";

class UserController {
  userService = new UserService();

  getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await this.userService.getUserByIdService(id);
      res.status(200).send({ success: true, message: data });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  createUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      await this.userService.createUserService({
        name,
        email,
        password,
      });
      res
        .status(200)
        .send({ success: true, message: "Usuario creado Exitosamente" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  updateUser = async (req, res) => {
    try {
      const { name, password, email } = req.body;
      const { id } = req.params;
      const data = await this.userService.updateUserService({
        id,
        name,
        password,
        email,
      });
      res.status(200).send({ success: true, message: data.message });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await this.userService.deleteUserService(id);
      res.status(200).send({ success: true, message: data });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const data = await this.userService.loginService({
        email,
        password,
      });
      console.log("🚀 ~ UsuarioController ~ login= ~ data:", data);

      res.cookie("token", data);
      res.status(200).send({
        success: true,
        message: "Usuario logueado con exito",
        token: data,
      });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  getMe = async (req, res) => {
    try {
      const token =
        req.cookies?.token || req.headers.authorization?.split(" ")[1];
      if (!token) throw new Error("Token no proporcionado");

      const data = await this.userService.getMe(token);
      res.status(200).send({ success: true, message: data });
    } catch (error) {
      res.status(401).send({ success: false, message: error.message });
    }
  };
}

export default UserController;

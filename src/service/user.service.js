import StatusError from "../Error/StatusError.js";
import { User } from "../database/models/user.js";
import { compareHash, hashPass } from "../helpers/hash.js";
import { createJWT } from "../helpers/jwt.js";

export default class UserService {
  hashPassword = async (password) => {
    return await hashPass(password);
  };

  register = async (data) => {
    try {
      console.log(data.password);
      let pass = await this.hashPassword(data.password);
      console.log(pass);
      data.password = pass;
      return await User.create(data);
    } catch (error) {
      console.log(error);
      return new StatusError("No se pudo registrar al usuario");
    }
  };

  login = async (data) => {
    try {
      let user = await this.findByEmail(data.email);
      let userIsValid = await this.compareHashPassword(user, data.password);
      let token = createJWT(userIsValid);
      userIsValid.token = token;
      return userIsValid;
    } catch (error) {
      console.log(error);
      return new StatusError("No se pudo logear al usuario", 400);
    }
  };
  compareHashPassword = async (pass, passToComapare) => {
    return await compareHash(pass, passToComapare);
  };
  findByEmail = async (email) => {
    return await User.findOne({
      where: {
        email,
      },
    });
  };
  update = async (data, email) => {
    try {
      try {
        let user = await User.update(data, {
          where: { email },
        });

        user = await this.findByEmail(email);
        return user;
      } catch (error) {
        console.log(error);
        return new StatusError("No existe este producto");
      }
    } catch (error) {
      console.log(error);
      return new StatusError("No se pudo actualizar al usuario", 400);
    }
  };
  delete = async (id) => {
    try {
      return await Product.destroy({
        where: { id },
      });
    } catch (error) {
      console.log(error);
      return new StatusError("No se pudo eliminar al usuario", 400);
    }
  };
}

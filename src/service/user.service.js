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
      let pass = await this.hashPassword(data.password);
      data.password = pass;
      let user = await User.create(data);
      if (!user) {
        throw new StatusError("No se pudo registrar al usuario", 400);
      }

      return user;
    } catch (error) {
      if (error instanceof StatusError) {
        return error;
      } else {
        return new StatusError("No se pudo registrar al usuario", 400);
      }
    }
  };

  login = async (data) => {
    try {
      let user = await this.findByEmail(data.email);
      if (!user) throw new StatusError("Email invalido", 404);
      let userIsValid = await this.compareHashPassword(
        data.password,
        user.password
      );
      if (!userIsValid) throw new StatusError("Password invalida", 400);
      let token = createJWT(user.email);
      if (!token) throw new StatusError("No se pudo crear el token", 400);
      user.dataValues.token = token;
      return user.dataValues;
    } catch (error) {
      if (error instanceof StatusError) {
        return error;
      } else {
        return new StatusError("No se pudo logear al usuario", 400);
      }
    }
  };
  compareHashPassword = async (pass, passToComapare) => {
    return await compareHash(pass, passToComapare);
  };
  findByEmail = async (email) => {
    try {
      let user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) throw new StatusError("No se encotro al usuario", 404);
      return user;
    } catch (error) {
      if (error instanceof StatusError) {
        return error;
      } else {
        return new StatusError("No se pudo logear al usuario", 400);
      }
    }
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
        if (error instanceof StatusError) {
          return error;
        } else {
          return new StatusError("No se pudo cambiar al usuario", 400);
        }
      }
    } catch (error) {
      console.log(error);
      return new StatusError("No se pudo actualizar al usuario", 400);
    }
  };
  delete = async (id) => {
    try {
      return await User.destroy({
        where: { id },
      });
    } catch (error) {
      console.log(error);
      return new StatusError("No se pudo eliminar al usuario", 400);
    }
  };
}

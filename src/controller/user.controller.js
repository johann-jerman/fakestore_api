import StatusError from "../Error/StatusError.js";
import { compareJWT } from "../helpers/jwt.js";
import UserService from "../service/user.service.js";
import { validationResult } from "express-validator";

export class UserController {
  userService = new UserService();
  getByEmail = async (req, res) => {
    let { email } = req.body;
    let authorization = req.headers.authorization;
    let user = await this.userService.findByEmail(email);
    let compare = compareJWT(authorization);
    if (!compare) {
      return res.json({
        data: {
          message: "Usuario no autenticado",
        },
      });
    }
    res.json({
      data: user,
    });
  };
  register = async (req, res) => {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({
        status: 400,
        error: err.mapped(),
        oldBody: req.body,
      });
    }
    let { firstName, lastName, email, password, image, rolId } = req.body;
    image = image ? image : "usuarioDefault.png";
    let user = await this.userService.register({
      firstName,
      lastName,
      email,
      password,
      image,
      RolId: rolId,
    });

    res.json({
      data: user,
    });
  };
  login = async (req, res) => {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({
        status: 400,
        error: err.mapped(),
        oldBody: req.body,
      });
    }
    let { email, password } = req.body;
    let user = await this.userService.login({ email, password });

    if (user instanceof StatusError) {
      return res.status(user.status).json({
        data: {
          message: user.message,
        },
      });
    }

    res.json({
      data: user,
    });
  };
  update = async (req, res) => {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({
        status: 400,
        error: err.mapped(),
        oldBody: req.body,
      });
    }
    let { firstName, lastName, email, image } = req.body;
    let authorization = req.headers.authorization;
    let compare = compareJWT(authorization);
    if (!compare) {
      return res.json({
        data: {
          message: "Usuario no autenticado",
        },
      });
    }
    let user = await this.userService.update(
      {
        firstName,
        lastName,
        image,
      },
      email
    );

    res.json({
      data: user,
    });
  };
  delete = async (req, res) => {
    let authorization = req.headers.authorization;
    let compare = compareJWT(authorization);
    if (!compare) {
      return res.json({
        data: {
          message: "Usuario no autenticado",
        },
      });
    }
    let user = await this.userService.delete(req.params.id);

    res.json({
      data: user,
    });
  };
}

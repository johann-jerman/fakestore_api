import { compareJWT } from "../helpers/jwt.js";

export const AuthMiddleware = (req, res, next) => {
  let authorization = req.headers.authorization?.slice(7);
  console.log(req.headers.authorization, authorization);
  if (!authorization) {
    return res.status(400).json({
      data: {
        msg: "Debe enviar su token",
      },
    });
  }
  console.log(authorization);
  let compare = compareJWT(authorization);
  if (!compare) {
    return res.json({
      data: {
        msg: "Usuario no autenticado",
      },
    });
  }
  next();
};

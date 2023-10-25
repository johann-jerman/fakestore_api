import { body } from "express-validator";
import path from "path";
import { User } from "../database/models/user.js";

export const userValidator = [
  body("firstName")
    .isLength({ min: 2 })
    .withMessage("Incluir al menos dos caracteres")
    .isLength({ max: 20 })
    .withMessage("Maximo 20 caracteres"),
  body("lastName")
    .isLength({ min: 2 })
    .withMessage("Incluir al menos dos caracteres"),

  body("email")
    .notEmpty()
    .withMessage("El campo debe completarse")
    .bail()
    .isEmail()
    .withMessage("Incluir tu correo electronico")
    .custom(async (val, { req }) => {
      let user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (user) throw new Error("Email ya registrado");

      return true;
    }),
  body("password").custom((val, { req }) => {
    let passwordVal = req.body.confirmPassword;
    if (val != passwordVal) {
      throw new Error("Contraseñas no coinciden");
    }
    return true;
  }),
  body("image").custom((val, { req }) => {
    const validExtension = [".jpg", ".jpeg", ".png"];
    const file = req.file;

    if (req.file) {
      const extension = path.extname(file.originalname);
      if (!validExtension.includes(extension)) {
        throw new Error(`Debe incluir ${validExtension.join(", ")}`);
      }
    }

    return true;
  }),
];

export const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("El campo debe completarse")
    .bail()
    .isEmail()
    .withMessage("Incluir tu correo electronico"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Debe tener minimo 5 caracteres"),
];

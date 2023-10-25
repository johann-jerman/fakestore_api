import { body } from "express-validator";
import { extname } from "path";

export const productValidator = [
  body("name")
    .isLength({ min: 5 })
    .withMessage("minimo 5 caracteres")
    .bail()
    .isLength({ max: 200 })
    .withMessage("Maximo 200 caracteres"),

  body("description")
    .isLength({ min: 10 })
    .withMessage("Maximo 700 caracteres")
    .bail()
    .isLength({ max: 700 })
    .withMessage("Maximo 700 caracteres"),

  body("price").isNumeric().withMessage("ingresar solo numeros"),
  body("productCategory").custom((val, { req }) => {
    if (val.length < 1) {
      throw new Error("Tenes que seleccionar una categoria");
    }
    return true;
  }),

  body("image").custom((val, { req }) => {
    const file = req.files;
    const validExtension = [".jpg", ".png", ".jpeg"];
    if (!file) {
      throw new Error("ingresar una imagen");
    }
    file.forEach((file) => {
      const extension = extname(file.originalname);
      if (!validExtension.includes(extension)) {
        throw new Error(
          `Las extenciones validas son ${validExtension.join(", ")}`
        );
      }
    });
    return true;
  }),
];
export const productUpdateValidator = [
  body("name")
    .isLength({ min: 5 })
    .withMessage("minimo 5 caracteres")
    .bail()
    .isLength({ max: 200 })
    .withMessage("Maximo 200 caracteres"),

  body("description")
    .isLength({ min: 10 })
    .withMessage("Maximo 700 caracteres")
    .bail()
    .isLength({ max: 700 })
    .withMessage("Maximo 700 caracteres"),

  body("price").isNumeric().withMessage("ingresar solo numeros"),
];

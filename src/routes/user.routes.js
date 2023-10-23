import { Router } from "express";
const route = Router();
import { UserController } from "../controller/user.controller.js";
import {
  userValidator,
  loginValidation,
} from "../middleware/user.validation.js";
import upload from "../middleware/multer.js";
const userController = new UserController();

//validar email no exista
route.post(
  "/register",
  upload.single("image"),
  userValidator,
  userController.register
);
route.post("/login", loginValidation, userController.login);
route.get("/", userController.getByEmail);
route.put("/", userValidator, userController.update);
route.delete("/:id", userController.delete);

export default route;

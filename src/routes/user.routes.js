import { Router } from "express";
const route = Router();
import { UserController } from "../controller/user.controller.js";
import {
  userValidator,
  loginValidation,
} from "../middleware/user.validation.js";
const userController = new UserController();

route.post("/register", userValidator, userController.register);
route.post("/login", loginValidation, userController.login);
route.put("/", userValidator, userController.update);
route.delete("/:id", userController.delete);

export default route;

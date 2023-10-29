import { Router } from "express";
const route = Router();
import { UserController } from "../controller/user.controller.js";
import {
  userValidator,
  loginValidation,
} from "../middleware/user.validation.js";
import upload from "../middleware/multer.js";
import { AuthMiddleware } from "../middleware/auth.middleware.js";
const userController = new UserController();

//validar email no exista

route.post(
  "/register",
  upload.single("image"),
  userValidator,
  userController.register
);
route.post("/login", loginValidation, userController.login);
route.get("/", AuthMiddleware, userController.getByEmail);
route.put("/", userValidator, userController.update);
route.delete("/delete/:id", AuthMiddleware, userController.delete);

export default route;

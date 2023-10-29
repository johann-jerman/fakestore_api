import { Router } from "express";
import { ProductController } from "../controller/product.controller.js";
import {
  productUpdateValidator,
  productValidator,
} from "../middleware/product.validation.js";
import upload from "../middleware/multer.js";
import { AuthMiddleware } from "../middleware/auth.middleware.js";
const route = Router();
const productController = new ProductController();

route.get("/", productController.getAll);
route.post(
  "/create",
  upload.array("image", 5),
  productValidator,
  AuthMiddleware,
  productController.create
);
route.get("/:id", productController.getById);
route.put(
  "/update/:id",
  productUpdateValidator,
  AuthMiddleware,
  productController.update
);
route.delete("/delete/:id", AuthMiddleware, productController.delete);

export default route;

import { Router } from "express";
import { ProductController } from "../controller/product.controller.js";
import { productValidator } from "../middleware/product.validation.js";
const route = Router();
const productController = new ProductController();

route.get("/", productController.getAll);
route.post("/", productValidator, productController.create);
route.get("/:id", productController.getById);
route.put("/:id", productValidator, productController.update);
route.delete("/:id", productController.delete);

export default route;

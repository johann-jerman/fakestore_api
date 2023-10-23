import ProductService from "../service/product.service.js";
import { validationResult } from "express-validator";

export class ProductController {
  productService = new ProductService();

  getAll = async (req, res) => {
    let { offset, limit, min_price, max_price, categoryId } = req.query;
    let products = await this.productService.getAll({
      offset,
      limit,
      min_price,
      max_price,
      categoryId,
    });
    res.json({
      data: products,
    });
  };
  create = async (req, res) => {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({
        status: 400,
        error: err.mapped(),
        oldBody: req.body,
      });
    }
    let { name, price, description, productCategory } = req.body;
    let products = await this.productService.create({
      name,
      price,
      description,
      ProductCategoryId: productCategory,
    });
    res.json({
      data: products,
    });
  };
  getById = async (req, res) => {
    let products = await this.productService.findById(req.params.id);
    res.json({
      data: products,
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
    let { name, price, description, productCategory } = req.body;
    let products = await this.productService.update(
      {
        name,
        price,
        description,
        ProductCategoryId: productCategory,
      },
      req.params.id
    );
    res.json({
      data: products,
    });
  };
  delete = async (req, res) => {
    let products = await this.productService.delete(req.params.id);
    res.json({
      data: products,
    });
  };
}

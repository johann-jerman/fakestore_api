import ProductService from "../service/product.service.js";

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

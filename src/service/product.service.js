import StatusError from "../Error/StatusError.js";
import { Product } from "../database/models/product.js";
import { ProductCategory } from "../database/models/productcategory.js";
import { Op } from "sequelize";

export default class ProductService {
  getAll = async (query) => {
    try {
      const whereClause = {};

      if (query.categoryId) {
        whereClause.ProductCategoryId = query.categoryId;
      }

      if (query.min_price || query.max_price) {
        whereClause.price = {};

        if (query.min_price) {
          whereClause.price = {
            ...whereClause.price,
            [Op.gte]: query.min_price,
          };
        }

        if (query.max_price) {
          whereClause.price = {
            ...whereClause.price,
            [Op.lte]: query.max_price,
          };
        }
      }

      return await Product.findAll({
        include: [
          { association: "category", attributes: ["id", "category"] },
          {
            association: "images",
            attributes: ["id", "image", "type", "size", "path"],
          },
        ],
        where: whereClause,
        limit: query.limit,
        offset: query.offset,
      });
    } catch (error) {
      console.log(error);
      return new StatusError("No pudiste acceder a la DB");
    }
  };
  findById = async (id) => {
    try {
      return await Product.findByPk(id, {
        include: [
          { association: "category", attributes: ["id", "category"] },
          {
            association: "images",
            attributes: ["id", "image", "type", "size", "path"],
          },
        ],
      });
    } catch (error) {
      console.log(error);
      return new StatusError("No existe este producto");
    }
  };
  create = async (data, files) => {
    try {
      let images = files.map((image) => {
        console.log(image);
        return {
          image: image.filename,
          type: image.mimetype,
          size: image.size,
          path: "/image/" + image.filename,
        };
      });

      let newProduct = await Product.create(
        {
          name: data.name,
          price: data.price,
          description: data.description,
          ProductCategoryId: data.productCategory,
          images: images,
        },
        { include: ["images"] }
      );
      return newProduct;
    } catch (error) {
      return new StatusError("No existe este producto");
    }
  };

  update = async (data, id) => {
    try {
      let product = await Product.update(data, {
        where: { id },
      });

      product = this.findById(id);
      return product;
    } catch (error) {
      console.log(error);
      return new StatusError("No existe este producto");
    }
  };

  delete = async (id) => {
    try {
      return await Product.destroy({
        where: { id },
      });
    } catch (error) {
      console.log(error);
      return new StatusError("No existe este producto");
    }
  };
}

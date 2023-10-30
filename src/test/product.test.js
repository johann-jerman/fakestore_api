import request from "supertest";
import test from "node:test";
import assert from "node:assert";
import app from "../app.js";

test("get all products", async () => {
  let res = await request(app)
    .get("/api/product")
    .set("Accept", "application/json")
    .expect(200);
  assert.equal(res.status, 200);
  assert.equal(res.type, "application/json");
});
test("create product", async () => {
  let newProduct = {
    name: "new product",
    price: 12354,
    description: "asdasdasdasdasadddddddddddddddddddddd",
    ProductCategoryId: 1,
    images: [
      {
        image: "usuarioDefault.png",
        type: "image/png",
        size: 123,
        path: "/image/" + "usuarioDefault.png",
      },
      {
        image: "usuarioDefault.png",
        type: "image/png",
        size: 123,
        path: "/image/" + "usuarioDefault.png",
      },
    ],
  };
  let res = await request(app)
    .get("/api/product/create")
    .set("Accept", "application/json")
    .send(newProduct)
    .expect(200);
  assert.equal(res.status, 200);
});

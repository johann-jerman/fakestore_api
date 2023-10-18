import express from "express";

import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import { ENV, PORT } from "./config/envs.js";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  if (ENV == "DEV") console.log(`http://localhost:${PORT}`);
});

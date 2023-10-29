import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import { ENV, PORT } from "./config/envs.js";
import { userSwaggerDoc } from "./doc/user.doc.js";
let port = PORT || 3000;

const corsOptions = {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Origin",
    "X-Requested-With",
    "Accept",
  ],
  preflightContinue: false,
  maxAge: 86400,
};

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(cors(corsOptions));

app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => {
  if (ENV == "DEV") console.log(`http://localhost:${port}`);
  userSwaggerDoc(app, port);
});

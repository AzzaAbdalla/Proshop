import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRouts.js";
import orderRoutes from "./routes/orderRoute.js";
import connectDB from "./config/connectDB.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();
connectDB();
const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
const port = process.env.PORT || 5000; //differenet port than frontend port (3000)

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static(path.join(__dirname, "../Frontend/build")));

  //any route that is not api will be redirected to index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../Frontend", "build", "index.html"))
  );
} else {
  app.get("/", (_, res) => {
    res.send("API Is Working ..");
  });
}

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running in port ${port} ...`));

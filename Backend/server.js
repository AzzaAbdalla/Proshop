import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import connectDB from "./config/connectDB.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();
const app = express();
app.use(cors());
const port = process.env.PORT || 5000; //differenet port than frontend port (3000)
app.get("/", (req, res) => {
  res.send("API Is Working ..");
});

app.use("/api/products", productRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running in port ${port} ...`));

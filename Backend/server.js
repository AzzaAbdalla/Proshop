import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/connectDB.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // to accept json data in request body
app.use(express.urlencoded({ extended: true })); // to accept url encoded data in request body

app.use(cors());
const port = process.env.PORT || 5000; //differenet port than frontend port (3000)
app.get("/", (req, res) => {
  res.send("API Is Working ..");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running in port ${port} ...`));

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import products from "./data/products.js";

dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT || 5000; //differenet port than frontend port (3000)

app.get("/", (req, res) => {
  res.send("API Is Working ..");
});
app.get("/api/products", (req, res) => {
  res.json(products);
});
app.get("/api/products/:id", (req, res) => {
  const product = products.find(
    (product) => product._id === parseInt(req.params.id)
  );
  res.json(product);
});

app.listen(port, () => console.log(`Server is running in port ${port} ...`));

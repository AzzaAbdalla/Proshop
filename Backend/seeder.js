import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./Modles/userModel.js";
import Product from "./Modles/productModel.js";
import Order from "./Modles/orderModel.js";
import connectDB from "./config/connectDB.js";

dotenv.config();
await connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProdutcs = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProdutcs);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

// argv is the input we pass at the cmd to tell the script ro import/destroy data
// if -d destroy else import data
if (process.argv[2] === "-d") destroyData();
else importData();

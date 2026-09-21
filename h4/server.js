const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const mongoose = require("mongoose");

const foodService = require("./services/foodService");
const foodHandler = require("./handlers/foodHandler");

const app = express();
app.use(express.json());

app.post("/users", foodHandler.createAccount);
app.post("/orders", foodHandler.createNewOrder);
app.get("/orders", foodHandler.getAllOrders);
app.get("/users/:userId/orders", foodHandler.getUserOrders);

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB!");
    await foodService.seedDatabase();
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => console.error("MongoDB Connection Error:", err.message));

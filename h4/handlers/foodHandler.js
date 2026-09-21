const foodService = require("../services/foodService");

const createAccount = async (req, res) => {
  try {
    const user = await foodService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createNewOrder = async (req, res) => {
  try {
    const order = await foodService.createOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await foodService.getOrdersByUser(req.params.userId);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await foodService.getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createAccount,
  createNewOrder,
  getUserOrders,
  getAllOrders,
};

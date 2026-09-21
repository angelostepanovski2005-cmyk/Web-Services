const User = require("../models/User");
const Order = require("../models/Order");

// User logic
const createUser = async (data) => await User.create(data);
const getUsers = async () => await User.find();

// Order logic
const createOrder = async (data) => await Order.create(data);
const getOrdersByUser = async (userId) =>
  await Order.find({ account_id: userId }).populate("account_id");
const getAllOrders = async () => await Order.find().populate("account_id");

// Seed script logic: 2 korisnici so po 3 naracki
const seedDatabase = async () => {
  await User.deleteMany({});
  await Order.deleteMany({});

  const user1 = await User.create({
    firstName: "Marko",
    familyName: "Petrovski",
    birthday: "1995-05-12",
    address: "Partizanska 12, Skopje",
  });

  const user2 = await User.create({
    firstName: "Elena",
    familyName: "Stojanova",
    birthday: "1998-11-23",
    address: "Shirok Sokak 45, Bitola",
  });

  await Order.create([
    {
      dishName: "Pizza Capricciosa",
      restaurantName: "Pizzeria 5",
      paymentMethod: "Card",
      account_id: user1._id,
    },
    {
      dishName: "Burger Classic",
      restaurantName: "7 Grama",
      paymentMethod: "Cash",
      account_id: user1._id,
    },
    {
      dishName: "Pasta Carbonara",
      restaurantName: "Gusto",
      paymentMethod: "Card",
      account_id: user1._id,
    },
    {
      dishName: "Sushi Roll",
      restaurantName: "Sakura",
      paymentMethod: "Card",
      account_id: user2._id,
    },
    {
      dishName: "Tavche Gravche",
      restaurantName: "Dukat",
      paymentMethod: "Cash",
      account_id: user2._id,
    },
    {
      dishName: "Club Sandwich",
      restaurantName: "Fitness House",
      paymentMethod: "Card",
      account_id: user2._id,
    },
  ]);

  console.log("Database seeded successfully with 2 users and 6 orders!");
};

module.exports = {
  createUser,
  getUsers,
  createOrder,
  getOrdersByUser,
  getAllOrders,
  seedDatabase,
};

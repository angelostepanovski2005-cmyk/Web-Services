const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    dishName: { type: String, required: true },
    restaurantName: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    account_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);

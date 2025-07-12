import mongoose from "mongoose";

const orderScehma = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    orderId: {
      type: String,
      required: true,
      unique: true,
      default: () => `ORD-${Date.now()}`,
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      default: "cod",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "preparing",
        "ready",
        "delivered",
        "cancelled",
        "Out for Delivery",
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);
const Order =
  mongoose.models && mongoose.models.Order
    ? mongoose.models.Order
    : mongoose.model("Order", orderScehma);
export default Order;

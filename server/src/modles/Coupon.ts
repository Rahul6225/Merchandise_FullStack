import mongoose, { Schema } from "mongoose";


const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true,"Please enter a coupon code"],
    unique: true,
  },
  amount: {
    type: Number,
    required: [true,"Pleasse enter a discount amount"]
  }
});



export const Coupon = mongoose.model("Coupon", couponSchema);

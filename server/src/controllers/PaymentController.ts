import { NextFunction, Request, Response } from "express";
import { CouponReqbody, Params, paymentReqBody } from "../types/types.js";
import { Coupon } from "../modles/Coupon.js";
import { stripe } from "../app.js";

export const newCoupon = async (
  req: Request<{}, {}, CouponReqbody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code, amount } = req.body;
    if (!code || !amount) {
      return next(new Error("code or amount is missing"));
    }
    await Coupon.create({ code, amount });

    res.status(201).json({
      success: true,
      message: `coupon ${code} created Successfully`,
    });
  } catch (error) {
    return next(new Error("Error in newCoupon"));
  }
};

export const applyDiscount = async (
  req: Request<{}, {}, CouponReqbody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code } = req.query;
    if (!code) {
      return next(new Error("code is missing"));
    }
    const discount = await Coupon.findOne({ code });
    if (!discount) {
      return next(new Error("Invalid Coupon code"));
    }
    res.status(200).json({
      success: true,
      discount: discount.amount,
    });
  } catch (error) {
    return next(new Error("Error in newCoupon"));
  }
};

export const allCoupon = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const coupons = await Coupon.find({});

    res.status(200).json({
      success: true,
      coupons,
    });
  } catch (error) {
    return next(new Error("Error in allCoupon"));
  }
};

export const deleteCoupon = async (
  req: Request<Params, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const coupon = await Coupon.findByIdAndDelete(id);
    if (!coupon) {
      return next(new Error("Invalid coupon ID"));
    }
    res.status(200).json({
      success: true,
      message: "Coupon Deleted",
    });
  } catch (error) {
    return next(new Error("Error in deleteCoupon"));
  }
};

export const createPaymentIntent = async (
  req: Request<Params, {}, paymentReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount } = req.body;
    console.log(amount);
    if (!amount) {
      return next(new Error("Please Enter Amount"));
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount * 100),
      currency: "inr",
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    return next(new Error("Error in payment"));
  }
};

import { NextFunction, Request, Response } from "express";
import { NewOrderReqBody, NewProduct, Params } from "../types/types.js";
import { Order } from "../modles/OrderModel.js";
import { reduceStock } from "../utils/features.js";
import { invalidateCache } from "../utils/Revalidate.js";
import { myCache } from "../app.js"

export const NewOrder = async (
  req: Request<Params, {}, NewOrderReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      shippingCharges,
      orderItems,
      user,
      subtotal,
      tax,
      shippingInfo,
      discount,
      total,
    } = req.body;
    if (!orderItems || !user || !subtotal || !tax || !shippingInfo || !total) {
      return next(new Error("Missing Fields"));
    }
  
    const ans = await Order.create({
      shippingCharges,
      orderItems,
      user,
      subtotal,
      tax,
      shippingInfo,
      discount,
      total,
    });

    await reduceStock(orderItems);

    await invalidateCache({ product: true, order: true, admin: true });
    res.status(201).json({
      sucess: true,
      message: "Order Placed Successfully",
    });
  } catch (error) {
    return next(new Error("NewOrder"));
  }
};

export const myOrders = async (
  req: Request<Params, {}, NewOrderReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: user } = req.query;

    let orders = [];

    orders = await Order.find({ user });
    // await invalidateCache({ product: true, order: true, admin: true });
    res.status(200).json({
      sucess: true,
      orders,
    });
  } catch (error) {
    return next(new Error("myOrders"));
  }
};

export const allOrders = async (
  req: Request<Params, {}, NewOrderReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    let orders = [];

    if (myCache.has("all-orders")) {
      orders = JSON.parse(myCache.get("all-orders") as string);
    } else {
      orders = await Order.find().populate("user", "name");
      myCache.set("all-orders", JSON.stringify(orders));
    }

    res.status(200).json({
      sucess: true,
      orders,
    });
  } catch (error) {
    return next(new Error("Error in myOrders"));
  }
};

export const getSingleOrder = async (
  req: Request<Params, {}, NewOrderReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    let order;

    order = await Order.findById(id).populate("user", "name");
    if (!order) {
      return next(new Error("No Order Found"));
    }
    res.status(200).json({
      sucess: true,
      order,
    });
  } catch (error) {
    return next(new Error("error in getSingleOrder"));
  }
};

export const processOrder = async (
  req: Request<Params, {}, NewOrderReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    let order;
    order = await Order.findById(id);
    if (!order) {
      return next(new Error("No Order Found"));
    }
    if (order.status === "Processing") {
      order.status = "Shipped";
    } else if (order.status === "Shipped") {
      order.status = "Delivered";
    } else {
      order.status = "Delivered";
    }
    await order.save();
    await invalidateCache({ product: false, order: true, admin: true });
    const status = order.status;
    res.status(200).json({
      success: true,
      status: status,
    });
  } catch (error) {
    return next(new Error("error in processOrder"));
  }
};

export const deleteOrder = async (
  req: Request<Params, {}, NewOrderReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    let order;
    order = await Order.findById(id);
    if (!order) {
      return next(new Error("No Order Found"));
    }
    await order.deleteOne();
    await invalidateCache({ product: false, order: true, admin: true });

    res.status(200).json({
      success: true,
      message: "Order Deleted",
    });
  } catch (error) {
    return next(new Error("error in deleteOrder"));
  }
};
